'use strict';

const express = require('express')
const app = express()

const PORT = require('./config.json').port;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log('index.js is listening on port ' + PORT));
