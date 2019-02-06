const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOption = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use("/images", express.static("images"));

/*
 * Route for getting all posts
 */
app.get("/api/wiitis", (req, res) => {
    res.send([{ title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    { title: "waht is this image", imgSrc: "images/wiiti-image.jpg" },
    { title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    { title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" },
    { title: "lorem ipsum kdls", imgSrc: "images/wiiti-image.jpg" }]);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));