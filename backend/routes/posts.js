const express = require('express');
const Post = require("../models/post");
const router = express.Router();

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
        likes: req.body.likes,
    });
    console.log(post);
    post.save().then((addedPost) => {
        res.status(201).json({
            message: 'Post was posted successfully!',
            postId: addedPost._id,
        });
    });
});

router.get('', (req, res, next) => {
    //aggregate practice
    Post.aggregate([{ $limit: 25 }, { $match: { author: 'Hanna' } }]);

    //sort practice
    Post.find()
        .sort({ date: -1 })
        .then((documents) => {
            res.status(200).json({
                message: 'Posts were fetched successfully!',
                posts: documents,
            });
        });
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {

        res.status(200).json({
            message: 'Post was updated successfully!'
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then( post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post was not found'})
        }
    });
})

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: 'post deleted' });
    });
});

module.exports = router;
