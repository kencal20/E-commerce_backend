const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'item_manager'],
    default: 'customer'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
