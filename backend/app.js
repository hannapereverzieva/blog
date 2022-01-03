const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Post = require('./models/post');
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/databasing', (err) => {
  if (!err) {
    console.log('MongoDB connection succeeded');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mocked data
const posts = [
  {
    id: '123',
    date: 'June 4th',
    title: 'Shiba Inu 1',
    author: 'John Galt',
    content: 'The Shiba Inu is the smallest of the six original and distinct spitz.',
  },
  {
    id: '123',
    date: 'July 15',
    title: 'Shiba Inu 2',
    author: 'John Galt',
    content: 'The Shiba Inu is the smallest of the six original and distinct spitz.',
  },
  {
    id: '123',
    date: 'May 5th',
    title: 'Shiba Inu 3',
    author: 'John Galt',
    content: 'The Shiba Inu is the smallest of the six original and distinct spitz.',
  },
];

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    likes: req.body.likes,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post was posted successfully!',
  });
});

app.get('/api/posts', (req, res, next) => {
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

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Oops, this is not a valid URL.',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    type: 'internal',
  });
});

app.use(express.static('dist/blog'));
module.exports = app;
