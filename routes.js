'use strict';

const db = require('./database.service');

function ping(req, res) {
    res.json({
        "pong": true
    });
}

function postNotes(req, res) {
    res.json(db.createNote(req.body.title, req.body.message));
}

function getNotes(req, res) {
    const results = db.findAllNotes();
    const response = {
        count: results.length,
        results
    };
    res.json(response);
}

module.exports = { ping, postNotes, getNotes };