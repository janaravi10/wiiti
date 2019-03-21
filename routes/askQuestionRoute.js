let multer = require("multer"),
  path = require("path"),
  fs = require("fs"),
  baseUploadLocation = "http://www.localhost:5000/uploads/",
  verifyToken = require("../util/jwtVerify");
module.exports = (app, db) => {
  /*
   * Storage area
   */
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // check if uploads directory is available
      if (fs.existsSync("./uploads/")) {
        cb(null, "./uploads/");
      } else {
        // create the folder and upload the images in it
        fs.mkdirSync("./uploads");
        cb(null, "./uploads/");
      }
    },
    filename: function(req, file, cb) {
      // function to create file name for the file uploading
      cb(
        null,
        file.originalname.split(".")[0].replace(/\s+/g, "") +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  });
  // handle file uploading
  function handleFileUpload(req, res, next) {
    upload(req, res, function(err) {
      if (!req.files.length) {
        // check if atleast one image is provided
        return res.json({
          success: false,
          error: "Please provide atleast one image!"
        });
      }
      if (!req.body.questionTitle && req.body.questionTitle.length < 10) {
        // check if atleast one image is provided
        return res.json({
          success: false,
          error: "Please provide question!"
        });
      }
      if (err) {
        // err.code is multer set value
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.json({ success: false, error: err.message });
        } else if (err.message === "INVALID_FILE_TYPE") {
          // err.message is own value from the file filter function
          return res.json({ success: false, error: err.message });
        } else {
          return res.json({ success: false, error: err.message });
        }
      } else {
        next();
      }
    });
  }

  // file filter function
  function fileFilter(req, file, cb) {
    let imgMime = ["image/jpeg", "image/png"];
    if (imgMime.indexOf(file.mimetype) === -1) {
      return cb(new Error("INVALID_FILE_TYPE"), false);
    }
    cb(null, true);
  }
  // start the upload
  let upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 }
  }).array("file[]");

  /*
   * route for api/new question
   */

  app.post("/api/new-question", [verifyToken, handleFileUpload], function(
    req,
    res,
    next
  ) {
    let questionData = {
        questionTitle: req.body.questionTitle,
        imgUrls: "",
        autherId: req.userId
      },
      imgUrls = [];
    // looping through the uploaded files and finding the filenames
    req.files.forEach(file => {
      imgUrls.push(baseUploadLocation + file.filename);
    });
    questionData.imgUrls = JSON.stringify(imgUrls);
    console.log(questionData);
    let sql = "INSERT INTO questions SET ?";
    // saving the data to the mongodb database;
    db.queryAsync(sql, questionData)
      .then(function(result) {
        // sending the response
        res.send({
          success: true,
          error: "Question uploaded Successfully!",
          questionId: result.insertId
        });
      })
      .catch(err => {
        res.send({
          success: false,
          error: err.code,
          message: "Internal server error!"
        });
      });
  });
};
