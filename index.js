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

/*
 * Route for getting all posts
 */
app.get("/api/wiitis", (req, res) => {
  res.send([
    { postId: 1, title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    {
      postId: 2,
      title: "waht is this image",
      imgSrc: "images/wiiti-image.jpg"
    },
    { postId: 3, title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    { postId: 4, title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    { postId: 5, title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" }
  ]);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
