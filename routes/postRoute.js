let NUM_QUESTION_COUNT = 10;
module.exports = (app, db) => {
  /*
   * Route for getting all posts
   */
  app.get("/api/wiitis", (req, res) => {
    let sql = "SELECT * FROM questions LIMIT " + NUM_QUESTION_COUNT;
    db.query(sql, function(err, wiitis) {
      if (!err) {
        // sending whole document to the user;
        res.json(wiitis);
      }
    });
  });
  app.get("/api/question/:postId", (req, res) => {
    let sql = "SELECT * FROM questions WHERE ? ";
    db.query(sql, { id: req.params.postId }, function(err, question) {
      if (!err) {
        // sending whole document to the user;
        if (question.length) {
          res.send({ success: true, question: question[0] });
        } else {
          res.send({
            success: false,
            error: "No question related to this url!"
          });
        }
      }
    });
  });
};
