const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  questionsAsked: [Object],
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
