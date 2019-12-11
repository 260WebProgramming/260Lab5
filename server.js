const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playerdb');
require('./models/Player');

var routes = require('./routes/index');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/', routes);



app.listen(3000, () => console.log('Server listening on port 3000!'));