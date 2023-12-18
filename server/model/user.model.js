const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  questionsAsked: [Object],
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
