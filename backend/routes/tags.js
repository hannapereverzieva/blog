const express = require('express');
const Tag = require("../models/tag");

const router = express.Router();

router.get('', (req, res, next) => {
    Tag.find()
        .then(documents => {
            res.status(200).json({
                message: 'Tags were fetched successfully!',
                tags: documents
            });
        });
});

module.exports = router;
