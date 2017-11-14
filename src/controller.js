'use strict';

const db = require('./memory.db.service');

function ping(req, res) {
    res[req.format]({
        "pong": true
    });
}

function postNote(req, res) {
    res[req.format](db.createNote(req.body.title, req.body.message));
}

function getNotes(req, res) {
    const results = db.findAllNotes();
    const response = {
        count: results.length,
        results
    };
    res[req.format](response);
}

function getNote(req, res) {
    res[req.format](db.findOneNote(req.params.id));
}

function putNote(req, res) {
    res[req.format](db.updateNote(req.params.id, req.body.title, req.body.message));
}

function deleteNote(req, res) {
    const success = db.removeNote(req.params.id);
    if (success) {
        res[req.format]({
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