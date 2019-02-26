let jwt = require("jsonwebtoken"),
  secret = process.env.PRIVATE_KEY_NODE,
  db = require("../db_connection/connection");
module.exports = function verifyToken(req, res, next) {
  // getting the token header
  const bearer = req.headers.authorization;
  if (bearer) {
    const token = bearer.split(" ")[1];
    // finding whether this token is stored in the logout collection
    // if it is stored then this is already logged out token
    let sql = "SELECT * FROM tokens WHERE ?";
    db.query(sql, { token }, function(err, doc) {
      if (err) {
        res.json({ success: false, error: "Internal server error" });
        return;
      }
      if (doc.length) {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            // jwt verification failed then update the isExpired value to true
            db.query("UPDATE tokens SET ?", { isExpired: true }, function(doc,err) {
              if (err) {
                console.error("ERROR!");
              }
            });
          }
          console.log("giving error here drer");
          // send token expired header because user logged out this jwt token
          res.json({
            success: false,
            statusCode: 401,
            error: "Token Expired!"
          });
        });
      } else {
        // jwt verify this token
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            console.log("giving error here");
            res.json({
              success: false,
              statusCode: 401,
              error: "Token Expired!"
            });
            console.log(err);
          } else {
            console.log(decoded);
            // setting the user id;
            req.userId = decoded.id;
            // if jwt verified successfully call next middleware
            next();
          }
        });
      }
    });
  } else {

    res.json({
      success: false,
      statusCode: 401,
      error: "Unauthorized user!"
    });
  }
};
