'use strict';

const Validate = {};

Validate.postNote = function (req, res, next) {
    if (!req.body.title || !req.body.message) {
        res.status(400).send("Improper parameter values.");
    } else {
        next();
    }
};

Validate.putNote = function (req, res, next) {
    if (req.body.title && req.body.title.length < 3) {
        res.status(400).send("Invalid 'title' parameter.");
    } else if (req.body.message && req.body.message.length < 3) {
        res.status(400).send("Invalid 'message' parameter.");
    } else {
        next();
    }
};

Validate.format = function (req, res, next) {
    if (req.body.format || req.query.format) {
        if (req.body.format === 'jsonp' || req.query.format === 'jsonp' ) {
            req.format = 'jsonp';
            next();
        } else {
            res.status(400).send("Unsupported format.");
        }
    } else {
        req.format = 'json';
        next();
    }
}

module.exports = Validate;