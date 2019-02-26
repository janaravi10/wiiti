let verifyToken = require("../util/jwtVerify");
let NUM_ANSWER_COUNT = 10;

module.exports = (app, db) => {
  /*
   * Route for getting all posts
   */
  app.get("/api/answers/:questionId", (req, res) => {
    let sql = "SELECT * FROM answers WHERE ? LIMIT " + NUM_ANSWER_COUNT;
    db.query(sql, { postId: req.params.questionId }, function(err, answers) {
      if (!err) {
        // sending whole document to the user;
        res.send({ success: true, answers });
      } else {
        res.send({ success: false, error: err.code });
      }
    });
  });
  // isanswered route to check whether the user has answered the question;
  app.get("/api/isanswered/:questionId", verifyToken, async (req, res) => {
    let result = await isAnswered(req.params.questionId, req.userId);
    if (result) {
      res.send({ success: true, answered: true, error: "ALREADY answered" });
    } else {
      res.send({ success: true, answered: false, error: "NOT answered" });
    }
  });

  // isanswered
  async function isAnswered(questionId, authorId) {
    let sql = `SELECT id FROM answers WHERE postId=${questionId} AND authorId=${authorId} `,
      data;
    try {
      data = await db.queryAsync(sql);
      return data.length === 0 ? false : true;
    } catch (error) {
      return error.code;
    }
  }
  // check whether the post is available
  async function isPostAvailable(questionId) {
    let sql = `SELECT id FROM questions WHERE id=${questionId}`,
      record;
    try {
      record = await db.queryAsync(sql);
      return record.length === 0 ? false : true;
    } catch (error) {
      return error.code;
    }
  }
  /// answer for the post
  app.post("/api/answer/:questionId/", verifyToken, async (req, res) => {
    if (req.body) {
      try {
        const isPost = await isPostAvailable(req.params.questionId);
        let alreadyAnswer = await isAnswered(req.params.questionId, req.userId),
          sqlInsert = "INSERT INTO answers SET ?",
          data = {
            postId: req.params.questionId,
            authorId: req.userId,
            content: req.body.answerContent,
            answeredOn: Date.now()
          };
        if (isPost) {
          if (alreadyAnswer === true) {
            sqlInsert =
              "UPDATE answers SET ?  WHERE postId = ? AND authorId = ?";
            data = { content: req.body.answerContent };
            db.queryAsync(sqlInsert, [data, req.params.questionId, req.userId])
              .then(doc => {
                res.send({
                  success: true,
                  error: "Answer updated",
                  message: "Answer updated!"
                });
              })
              .catch(err => {
                console.log(err);
                res.send({
                  success: false,
                  error: "cannot update!",
                  message: "Couln't update answer!"
                });
              });
          } else if (alreadyAnswer === false) {
            // inserting the answer into the database
            db.queryAsync(sqlInsert, data)
              .then((doc, field) => {
                res.send({
                  success: true,
                  answer: doc,
                  message: "Answer submitted!"
                });
              })
              .catch(err => {
                console.log(err);
                res.send({
                  success: false,
                  error: err.code,
                  message: "Can't answer , Internel server error!"
                });
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // route for deleting the answer
  app.delete("/api/answer/:questionId", verifyToken, async (req, res) => {
    let sql = "DELETE FROM answers WHERE postId = ? AND authorId = ?";
    db.queryAsync(sql, [req.params.questionId, req.userId])
      .then(field => {
        res.send({
          success: true,
          error: field,
          message: "Your answer is deleted!"
        });
      })
      .catch(error => {
        console.log(error);
        res.send({
          success: false,
          error: error.code,
          message: "Unable to delete your answer!"
        });
      });
  });
};
