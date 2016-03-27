var mongoose = require('mongoose');

var userSchema = new mongoose.schema({
  

});

var User = mongoose.model('User', userSchema);

module.exports = User;
