const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get("/api/posts", (req, res,next) => {
    const posts = [
        {
            id: "123",
            date: "June 4th",
            title: "Shiba Inu 1",
            author: "John Galt",
            content: "The Shiba Inu is the smallest of the six original and distinct spitz."
        },
        {
            id: "123",
            date: "July 15",
            title: "Shiba Inu 2",
            author: "John Galt",
            content: "The Shiba Inu is the smallest of the six original and distinct spitz."
        },
        {
            id: "123",
            date: "May 5th",
            title: "Shiba Inu 3",
            author: "John Galt",
            content:"The Shiba Inu is the smallest of the six original and distinct spitz."
        }
    ]

    res.status(200).json({
        message: "Posts were fetched successfully!",
        posts: posts
    });

    app.get("*", (req, res, next) => {
        res.status(404).json({
            message: "Oops, this is not a valid URL."
        })
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            type: 'internal'
        });
    })

});

app.use(express.static("dist/blog"));
module.exports = app;
