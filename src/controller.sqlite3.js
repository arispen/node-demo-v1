'use strict';

const db = require('./sqlite3.db.service');

function ping(req, res) {
    res[req.format]({
        "pong": true
    });
}

function postNote(req, res) {
    db.createNote(req.body.title, req.body.message)
        .then((result) => {
            res[req.format](result);
        });
}

function getNotes(req, res) {
    db.findAllNotes(req.query.offset, req.query.limit)
        .then((results) => {
            const response = {
                count: results.length,
                results
            };
            res[req.format](response);
        });
}

function getNote(req, res) {
    db.findOneNote(req.params.id).then(result => {
        res[req.format](result);
    });
    
}

function putNote(req, res) {
    db.updateNote(req.params.id, req.body.title, req.body.message).then(result => {
        const updatedNote = result;
        if (updatedNote) {
            res[req.format](updatedNote);
        } else {
            res.status(404).send("Element does not exist.");
        }
    });
}

function deleteNote(req, res) {
    db.removeNote(req.params.id).then(result => {
        const success = result;
        if (success) {
            res[req.format]({
                success: true
            });
        } else {
            res.status(404).send("Element does not exist.");
        }
    });
}

module.exports = {
    ping,
    postNote,
    getNotes,
    getNote,
    putNote,
    deleteNote
};