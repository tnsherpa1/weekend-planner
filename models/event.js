var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  interest: String
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
