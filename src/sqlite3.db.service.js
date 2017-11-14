'use strict';

const Note = require('./note.model.js');

Note.sync().then(() => {
    console.log('model synced');
});

const SQLiteDBService = {};


SQLiteDBService.createNote = function(title, message) {
    return Note.create({
        title,
        message
    });
}

SQLiteDBService.findAllNotes = function(offset, limit) {
    return Note.findAll({
        offset,
        limit
    });
}

SQLiteDBService.findOneNote = function(id) {
    return Note.findById(id);
}

SQLiteDBService.updateNote = function(id, newTitle, newMessage) {
    return Note.findById(id).then((note) => {
        if(!note){
            return null;
        }
        if (newTitle) {
            note.title = newTitle;
        }
        if (newMessage) {
            note.message = newMessage;
        }
        return note.save();
    });
}

SQLiteDBService.removeNote = function(id) {
    return Note.findById(id).then((note) => {
        if(!note){
            return null;
        }
        return note.destroy();
    });
}

module.exports = SQLiteDBService;