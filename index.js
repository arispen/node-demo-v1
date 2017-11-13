'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const PORT = require('./config.json').port;
const routes = require('./routes');
                                    
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.route('/v1/ping')
    .get(routes.ping);

app.listen(PORT, () => console.log('index.js is listening on port ' + PORT));
