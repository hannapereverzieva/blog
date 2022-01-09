const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoutes = require('./routes/posts');
const path = require('path');
const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/databasing', (err) => {
  if (!err) {
    console.log('MongoDB connection succeeded');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use('/api/posts', postsRoutes);

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
