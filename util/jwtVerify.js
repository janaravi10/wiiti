let jwt = require("jsonwebtoken"),
  logoutModel = require("../models/logoutModel"),
  secret = process.env.PRIVATE_KEY_NODE;
module.exports = function verifyToken(req, res, next) {
  // getting the token header
  const bearer = req.headers.authorization;
  if (bearer) {
    const token = bearer.split(" ")[1];
    // finding whether this token is stored in the logout collection
    // if it is stored then this is already logged out token
    logoutModel.findOne({ token }, function(err, doc) {
      if (err) {
        res.json({ success: false, error: "Internal server error" });
        return;
      }
      if (doc) {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            // jwt verification failed then update the isExpired value to true
            doc.isExpired = true;
            doc.save(function(err) {
              if (err) {
                console.error("ERROR!");
              }
            });
          }
          // send token expired header because user logged this jwt token
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
            res.json({
              success: false,
              statusCode: 401,
              error: "Token Expired!"
            });
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
