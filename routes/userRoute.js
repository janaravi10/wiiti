const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  verifyToken = require("../util/jwtVerify");
secret = process.env.PRIVATE_KEY_NODE;
module.exports = (app, db) => {
  app.get("/api/authed", verifyToken, (req, res) => {
    res.send({ success: true, error: "You are logged  in !",userId: req.userId });
  });
  /*
   * route for user to signup for the account
   */
  app.post("/api/signup", (req, res) => {
    //getting the body
    const body = req.body;
    let  { password, email } = body;
    // checking if the user has enter the email and password with the request
    if (email && password) {
      let sql = "SELECT * FROM users WHERE ?";
      db.query(sql, { email }, function(err, obj, fields) {
        if (err) {
          res.json({ success: false, error: "Internal server error" });
          return;
        }
        if (obj.length) {
          console.log(obj);
          res.json({
            success: false,
            error: "Email address already registered!"
          });
        } else {
          // hashing the password with bcrypt
          bcrypt
            .hash(password, 10)
            .then(hashedData => {
              // getting the hashed data
              let sqlData = {
                email,
                password: hashedData
              };
              let sql = "INSERT INTO users SET ?";
              //saving the data to database
              db.query(sql, sqlData, (error, savedDoc, fields) => {
                if (error) {
                  console.log(error);
                  res.send({ success: false, error: error.code });
                  return;
                }
                console.log(savedDoc);
               
                jwt.sign(
                  { id: savedDoc.insertId },
                  secret,
                  { expiresIn: 60 * 60 * 24 * 7 },
                  function(err, token) {
                    if (!err) {
                      res.json({
                        success: true,
                        error: "User created",
                        token,userId: savedDoc.insertId
                      });
                    }
                  }
                );
              });
            })
            .catch(err => {
              if (err) {
                res.json({ success: false, error: "Internal server error" });
                return;
              }
            });
        }
      });
    } else {
      res.json({ success: false, error: "No data has been providedsdf" });
    }
  });

  /*
   * route for user to login to the account
   */
  app.post("/api/login", (req, res) => {
    const body = req.body;
    let { password, email } = body;
    if (email && password) {
      let sql = "SELECT * FROM users WHERE ?";
      // fetching the user with the email address
      db.query(sql, { email }, (err, doc, fields) => {
        if (err) {
          res.json({ success: false, error: err.code });
          return;
        }
        if (doc.length !== 1) {
          res.json({ success: false, error: "No user available" });
        } else {
          console.log(doc);
          /*
           * comparing the password with the hash
           */
          bcrypt
            .compare(password, doc[0].password)
            .then(compareResult => {
              if (compareResult) {
                jwt.sign(
                  { email, id: doc[0].id },
                  secret,
                  { expiresIn: 60 * 60 * 24 * 7 },
                  function(err, token) {
                    if (!err) {
                      res.json({
                        success: true,
                        error: "User logged in!",
                        token, userId: doc[0].id
                      });
                    }
                  }
                );
              } else {
                res.json({
                  success: false,
                  error: "password doesn't match!"
                });
              }
            })
            .catch(err => console.log(err));
        }
      });
    } else {
      res.json({ success: false, error: "No data has been providedsdf" });
    }
  });
  /*
   * route for logging out the user from the session
   */
  app.get("/api/logout", (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer) {
      const token = bearer.split(" ")[1];
      let sql = "INSERT INTO tokens SET ?";
      //saving the token to database
      db.query(sql, { token }, (err, savedDoc) => {
        if (err) {
          res.json({ success: false, error: "Internel server error!" });
          return;
        }
        res.json({
          success: true,
          statusCode: 200,
          error: "User logged out!"
        });
      });
    } else {
      res.json({
        success: false,
        statusCode: 401,
        error: "Token not provided"
      });
    }
  });
};
