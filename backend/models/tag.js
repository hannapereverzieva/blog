const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name: { type: String, required: true },
    postsIds: { type: [String]}
})

module.exports = mongoose.model('Tag', tagSchema);
