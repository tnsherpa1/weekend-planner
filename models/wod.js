var mongoose = require('mongoose');

var wodSchema = new mongoose.Schema({
  title: String,
  description: String
});

var Wod = mongoose.model('Wod', wodSchema);
module.exports = Wod;
