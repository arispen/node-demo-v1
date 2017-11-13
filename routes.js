'use strict';

const db = require('./database.service');

function ping(req, res) {
    res.json({
        "pong": true
    });
}

function postNote(req, res) {
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
    res.json(db.updateNote(req.params.id, req.body.title, req.body.message));
}

function deleteNote(req, res) {
    const success = db.removeNote(req.params.id);
    if (success) {
        res.json({
            success: true
        });
    } else {
        res.status(404).send("Element does not exist.");
    }
}

module.exports = {
    ping,
    postNote,
    getNotes,
    getNote,
    putNote,
    deleteNote
};