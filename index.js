const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOption = {
  origin: "http://localhost:3000"
}; 
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use("/images", express.static("images"));
require("./routes/userRoute")(app)
require("./routes/postRoute")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
