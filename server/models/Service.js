// models/Service.js — collection services (dịch vụ chăm sóc da/spa)
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name:            { type: String, required: true }, // "Soi da", "Nặn mụn chuyên sâu"
  slug:            { type: String, required: true, unique: true },
  description:     { type: String },
  durationMinutes: { type: Number },
  price:           { type: Number },
  imageUrl:        { type: String },
  serviceType:     { type: String, enum: ['tu_van_da','cham_soc_co_ban','cham_soc_chuyen_sau','dich_vu_mun','lam_sang_da'] },
  isActive:        { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
