const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  cors = require("cors"),
  corsOption = {
    origin: "http://localhost:3000",
    credentials: true
  },
  cookieParser = require("cookie-parser"),
  port = process.env.PORT || 5000,
  db = require("./db_connection/connection");
app.use(cookieParser());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use("/images", express.static("images"));
app.use("/uploads", express.static("uploads"));
require("./routes/userRoute")(app, db);
require("./routes/postRoute")(app, db);
require("./routes/askQuestionRoute")(app, db);
require("./routes/answerRoute")(app, db);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
