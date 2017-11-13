'use strict';

const Validate = {};

Validate.postNote = function (req, res, next) {
    if (req.body.title.length > 0 && req.body.message.length > 0) {
        next();
    } else {
        res.status(400).send("Improper parameter values.");
    }
};

module.exports = Validate;