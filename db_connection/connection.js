const PromiseBlue = require("bluebird"),
  mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wiiti"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// callback function to close the database connection
process.on("SIGINT", function() {
  connection.end();
  process.exit(0);
});
module.exports = PromiseBlue.promisifyAll(connection);
