// models/Store.js — collection stores (= branches trong ERD)
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  address:     { type: String, required: true },
  province:    { type: String },
  district:    { type: String },
  phone:       { type: String },
  latitude:    { type: Number },
  longitude:   { type: Number },
  mapEmbedUrl: { type: String }, // link iframe Google Maps
  openingHours:{ type: String },
  imageUrl:    { type: String },
  isActive:    { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
