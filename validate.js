'use strict';

const Validate = {};

Validate.postNote = function (req, res, next) {
    if (req.body.title.length === 0 || req.body.message.length === 0) {
        res.status(400).send("Improper parameter values.");
    } else {
        next();
    }
};

Validate.putNote = function (req, res, next) {
    if (req.body.title && req.body.title.length < 3) {
        res.status(400).send("Invalid 'title' parameter.");
    }
    if (req.body.message && req.body.message.length < 3) {
        res.status(400).send("Invalid 'message' parameter.");
    }
    next();
};

module.exports = Validate;