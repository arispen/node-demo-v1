'use strict';

const DBService = {};

DBService.database = [];

DBService.createNote = function(title, message) {
    // this is not autoincrement of course
    const newNoteId = DBService.database.length;
    const newNote = {
        id: newNoteId,
        title : title,
        message: message
    }
    DBService.database.push(newNote);
    // here will be promise instead
    return newNote;
}