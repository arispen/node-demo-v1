'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const PORT = require('./config').port;
const controller = require('./src/controller.sqlite3');
const validate = require('./src/validate.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

app.use(validate.format);

app.route('/v1/ping')
    .get(controller.ping);

app.route('/v1/notes')
    .post(validate.postNote, controller.postNote)
    .get(controller.getNotes);

app.route('/v1/notes/:id')
    .put(validate.putNote, controller.putNote)
    .get(controller.getNote)
    .delete(controller.deleteNote);

app.listen(PORT, () => console.log('index.js is listening on port ' + PORT));