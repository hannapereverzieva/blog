const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  creator: { type: String, required: true },
  imagePath: { type: String, required: true},
  likes: { type: [String] },
  comments: { type: [String] },
  tags: { type: [String]}
});

module.exports = mongoose.model('Post', postSchema);
