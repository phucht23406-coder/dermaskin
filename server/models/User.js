// models/User.js — collection users (người dùng & admin)
const mongoose = require('mongoose');

// addresses (ERD) -> NHÚNG vào user
const addressSchema = new mongoose.Schema({
  recipientName:  { type: String, required: true },
  recipientPhone: { type: String, required: true },
  province:       { type: String, required: true },
  district:       { type: String, required: true },
  ward:           { type: String, required: true },
  detail:         { type: String, required: true },
  isDefault:      { type: Boolean, default: false }
}, { _id: true });

const userSchema = new mongoose.Schema({
  email:        { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  phone:        { type: String, unique: true, sparse: true, trim: true },
  passwordHash: { type: String },
  fullName:     { type: String },
  avatarUrl:    { type: String },
  role:         { type: String, enum: ['customer', 'admin'], default: 'customer' },
  gender:       { type: String, enum: ['male', 'female', 'other'] },
  dateOfBirth:  { type: Date },
  isActive:     { type: Boolean, default: true },

  addresses: [addressSchema],                                          // gộp bảng addresses
  wishlist:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // gộp bảng wishlists
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
