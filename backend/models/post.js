const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  date: { type: Date, required: true },
  likes: { type: [String] },
  comments: { type: [String] },
});

module.exports = mongoose.model('Post', postSchema);
