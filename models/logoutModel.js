const mongoose = require("../db_connection/connection");
const tokenSchema = new mongoose.Schema({
    token: {
        type: String
    },
    isExpired: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("tokens", tokenSchema);