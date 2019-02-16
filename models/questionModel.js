const mongoose = require("../db_connection/connection");
const questionSchema = new mongoose.Schema({
  authorId: {
    type: String
  },
  questionTitle: {
    type: String
  },
    imgUrls: [{
        type: String
    }]
});
module.exports = mongoose.model("questions", questionSchema);
