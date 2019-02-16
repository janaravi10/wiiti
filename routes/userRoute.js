const userModel = require("../models/userModel"),
  logoutModel = require("../models/logoutModel"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  verifyToken = require("../util/jwtVerify");
secret = process.env.PRIVATE_KEY_NODE;
module.exports = app => {
  app.get("/api/authed", verifyToken, (req, res) => {
    res.send({ success: true, error: "You are logged  in !" });
  });
  /*
   * route for user to signup for the account
   */
  app.post("/api/signup", (req, res) => {
    //getting the body
    const body = req.body;
    console.log(body)
    let userDocument,
      { password, email } = body;
    // checking if the user has enter the email and password with the request
    if (email && password) {
      userModel.findOne({ email }, function(err, obj) {
        if (err) {
          res.json({ success: false, error: "Internal server error" });
          return;
        }
        if (obj) {
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
              userDocument = new userModel({
                email,
                password: hashedData
              });
              //saving the data to database
              userDocument
                .save()
                .then(savedDoc => {
                  jwt.sign({ id: savedDoc._id }, secret, { expiresIn: 60 * 60 * 24 * 7 }, function(
                    err,
                    token
                  ) {
                    if (!err) {
                      res.json({
                        success: true,
                        error: "User created",
                        token
                      });
                    }
                  });
                })
                .catch(err => {
                  res.json({ success: false, error: "Internel server error!" });
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
      // fetching the user with the email address
      userModel
        .find({ email: email })
        .then(doc => {
          if (doc.length !== 1) {
            res.json({ success: false, error: "No user available" });
          } else {
            /*
             * comparing the password with the hash
             */
            bcrypt
              .compare(password, doc[0].password)
              .then(compareResult => {
                if (compareResult) {
                  jwt.sign({ email, id: doc[0]._id }, secret, { expiresIn: 60 * 60 * 24 * 7}, function(
                    err,
                    token
                  ) {
                    if (!err) {
                      res.json({
                        success: true,
                        error: "User logged in!",
                        token
                      });
                    }
                  });
                } else {
                  res.json({
                    success: false,
                    error: "password doesn't match!"
                  });
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
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
      let logoutDocument = new logoutModel({ token });
      //saving the token to database
      logoutDocument
        .save()
        .then(savedDoc => {
          res.json({ success: true,statusCode: 200, error: "User logged out!" });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false, error: "Internel server error!" });
        });
    }else{
      res.json({ success: false,statusCode: 401, error: "Token not provided" });
    }
  });
};
