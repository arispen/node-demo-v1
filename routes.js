'use strict';

function ping(req, res) {
    res.json({
        "pong": true
    });
}

module.exports = { ping };