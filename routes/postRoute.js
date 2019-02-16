let questionModel = require("../models/questionModel"),
  NUM_QUESTION_COUNT = 5;
module.exports = app => {
  /*
   * Route for getting all posts
   */
  app.get("/api/wiitis", (req, res) => {
    questionModel
      .find({}) 
      .limit(NUM_QUESTION_COUNT) // limiting the number of document returned;
      .exec(function(err, wiitis) {
        if (!err) {
          // sending whole document to the user;
          res.json(wiitis);
        }
      });
  });
};
