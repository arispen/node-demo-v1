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
    const idNumber = parseInt(id);
    const note = DBService.database.find(element => element.id === idNumber );
    return note;
};

DBService.updateNote = function (id, title, message) {
    const note = DBService.findOneNote(id);
    note.title = title;
    note.message = message;
    return note;
};

DBService.removeNote = function (id) {};






module.exports = DBService;