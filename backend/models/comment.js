const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    authorEmail: { type: String },
    postId: { type: String}
})

module.exports = mongoose.model('Comment', commentSchema);
