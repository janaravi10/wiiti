module.exports = app => {
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
};
