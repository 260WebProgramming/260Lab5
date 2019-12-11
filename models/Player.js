var mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  teamName: String,
  name: String,
  position: String,
  rating: Number
});

mongoose.model('Player', playerSchema);