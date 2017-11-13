'use strict';

const DBService = {};

DBService.database = [];

DBService.createNote = function (title, message) {
    // this is not autoincrement of course
    const newNoteId = DBService.database.length;
    const newNote = {
        id: newNoteId,
        title: title,
        message: message
    }
    DBService.database.push(newNote);
    // here will be promises instead
    return newNote;
}

DBService.findAllNotes = function () {
    return DBService.database;
};

DBService.findOneNote = function (id) {
    return DBService.database.findIndex((e) => e.id === id);
};

DBService.removeNote = function (id) {};

DBService.updateNote = function (id, title, message) {};




module.exports = DBService;