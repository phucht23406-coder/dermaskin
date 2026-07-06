// models/Brand.js — collection brands (thương hiệu mỹ phẩm)
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name:            { type: String, required: true }, // "La Roche-Posay", "Eucerin"...
  slug:            { type: String, required: true, unique: true },
  logoUrl:         { type: String },
  description:     { type: String },
  countryOfOrigin: { type: String },
  isActive:        { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
