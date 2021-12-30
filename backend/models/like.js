const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    authorEmail: { type: String },
    postId: { type: String}
})

module.exports = mongoose.model('Like', likeSchema);
