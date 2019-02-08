const userModel = require("../models/userModel"),
  bcrypt = require("bcrypt");
module.exports = app => {
  /*
   * route for user to signup for the account
   */
  app.post("/api/signup", (req, res) => {
    //getting the body
    const body = req.body;
    let userDocument,
      { password, email } = body;
    // checking if the user has enter the email and password with the request
    if (email && password) {
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
              console.log(savedDoc);
              res.json({ success: true, error: "user created" });
            })
            .catch(err => {
              console.log(err);
              res.json({ success: false, error: "Internel server error!" });
            });
        })
        .catch(err => {
          if (err) {
            console.log(err);
            res.json({ success: false, error: "Internal server error" });
            return;
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
             * comparing the password with the has
             */
            bcrypt
              .compare(password, doc[0].password)
              .then(compareResult => {
                if (compareResult) {
                  res.json({ success: true, error: "You are logged in!" });
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
};
