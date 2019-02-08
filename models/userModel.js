const mongoose = require("../db_connection/connection");
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("Users", userSchema);
