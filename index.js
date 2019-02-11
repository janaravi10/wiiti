const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  app = express(),
  cors = require("cors"),
  corsOption = {
    origin: "http://localhost:3000",
    credentials: true
  },
  cookieParser = require("cookie-parser"),
  port = process.env.PORT || 5000,
  secret = process.env.PRIVATE_KEY_NODE;
app.use(cookieParser());
app.use(session({ secret, resave: false, saveUninitialized: false }));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use("/images", express.static("images"));
require("./routes/userRoute")(app);
require("./routes/postRoute")(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
