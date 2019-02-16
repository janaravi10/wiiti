const mongoose = require("../db_connection/connection");
const answerSchema = new mongoose.Schema({
    questionId: {
        type: String
    },
    questionTitle: {
        type: String
    },
    imgUrls: [{
        type: String
    }]
});
module.exports = mongoose.model("answers", answerSchema);