'use strict';

const Validate = {};
const minimumParameterLength = 3;

Validate.format = function (req, res, next) {
    if (req.body.format || req.query.format) {
        if (req.body.format === 'jsonp' || req.query.format === 'jsonp') {
            req.format = 'jsonp';
            next();
        } else {
            res.status(400).send('Unsupported format.');
        }
    } else {
        req.format = 'json';
        next();
    }
}

Validate.postNote = function (req, res, next) {
    if (!req.body.title || !req.body.message) {
        res.status(400)[req.format]({
            'code': 400,
            'message': 'Invalid parameters.'
        });
    } else {
        if (req.body.title.length < minimumParameterLength) {
            res.status(400)[req.format]({
                'code': 400,
                'message': 'Invalid "title" parameter.'
            });
        } else if (req.body.message.length < minimumParameterLength) {
            res.status(400)[req.format]({
                'code': 400,
                'message': 'Invalid "message" parameter.'
            });
        } else {
            next();
        }
    }
};

Validate.putNote = function (req, res, next) {
    if (req.body.title && req.body.title.length < minimumParameterLength) {
        res.status(400)[req.format]({
            'code': 400,
            'message': 'Invalid "title" parameter.'
        });
    } else if (req.body.message && req.body.message.length < minimumParameterLength) {
        res.status(400)[req.format]({
            'code': 400,
            'message': 'Invalid "message" parameter.'
        });
    } else {
        next();
    }
};

module.exports = Validate;