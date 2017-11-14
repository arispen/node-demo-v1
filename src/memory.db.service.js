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
    return newNote;
}

DBService.findAllNotes = function () {
    return DBService.database;
};

DBService.findOneNote = function (id) {
    const idNumber = parseInt(id);
    const note = DBService.database.find(element => element.id === idNumber);
    return note;
};

DBService.updateNote = function (id, title, message) {
    const note = DBService.findOneNote(id);
    if(!note){
        return false;
    }
    if (title) {
        note.title = title;
    }
    if (message) {
        note.message = message;
    }
    return note;
};

DBService.removeNote = function (id) {
    const note = DBService.findOneNote(id);
    if(!note){
        return false;
    } else {
        DBService.database.splice(DBService.database.findIndex(element => element.id === note.id), 1);
        return true;
    }
};

module.exports = DBService;