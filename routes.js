'use strict';

const db = require('./database.service');

function ping(req, res) {
    res.json({
        "pong": true
    });
}

function postNote(req, res) {
    //TODO VALIDATE
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

function getNote(req, res) {
    res.json(db.findOneNote(req.params.id));
}

function putNote(req, res) {
    //TODO - VALIDATE (optional params)
    res.json(db.updateNote(req.params.id, req.body.title, req.body.message));
}

module.exports = { ping, postNote, getNotes, getNote, putNote };