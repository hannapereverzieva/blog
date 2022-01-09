const express = require('express');
const multer = require('multer');
const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('', multer({storage: storage}).single('image'),(req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
        likes: req.body.likes,
        imagePath: url + "/images/" + req.file.filename
    });
    console.log(post);
    post.save().then((addedPost) => {
        res.status(201).json({
            message: 'Post was posted successfully!',
            post: {
                ...addedPost,
                id: addedPost._id
            }
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

router.put('/:id', multer({storage: storage}).single('image'),(req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
        imagePath: imagePath
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {

        res.status(200).json({
            message: 'Post was updated successfully!',
            post: post
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
