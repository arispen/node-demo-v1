'use strict';

const db = require('./sqlite3.db.service');
const Controller = {};

Controller.ping = function(req, res) {
    res[req.format]({
        'pong': true
    });
}

Controller.postNote = function(req, res) {
    db.createNote(req.body.title, req.body.message)
        .then((result) => {
            res[req.format](result);
        });
}

Controller.getNotes = function(req, res) {
    db.findAllNotes(req.query.offset, req.query.limit)
        .then((results) => {
            const response = {
                count: results.length,
                results
            };
            res[req.format](response);
        });
}

Controller.getNote = function(req, res) {
    db.findOneNote(req.params.id).then(note => {
        if(note){
            res[req.format](note);
        } else {
            res.status(404)[req.format]({
                'code': 404,
                'message': 'Element does not exist.'
            });
        }
    });
}

Controller.putNote = function(req, res) {
    db.updateNote(req.params.id, req.body.title, req.body.message).then(updatedNote => {
        if (updatedNote) {
            res[req.format](updatedNote);
        } else {
            res.status(404)[req.format]({
                'code': 404,
                'message': 'Element does not exist.'
            });
        }
    });
}

Controller.deleteNote = function(req, res) {
    db.removeNote(req.params.id).then(success => {
        if (success) {
            res[req.format]({
                success: true
            });
        } else {
            res.status(404)[req.format]({
                'code': 404,
                'message': 'Element does not exist.'
            });
        }
    });
}

module.exports = Controller;