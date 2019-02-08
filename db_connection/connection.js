const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user", { useNewUrlParser: true });
// callback function to get the connection status
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection is open to ");
});
// callback function to get the connection error status
mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection has occured " + err + " error");
});

// callback function to close the database connection
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});
module.exports = mongoose;