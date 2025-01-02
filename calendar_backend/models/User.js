const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'] // You can add more roles as needed
  },
  Name:{
    type: String,
    required: true
  },
  Email:{
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
