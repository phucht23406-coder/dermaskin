// models/Appointment.js — collection appointments (lịch hẹn dịch vụ)
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentCode: { type: String, required: true, unique: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  storeId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // ref tới collection services

  fullName: { type: String, required: true },
  phone:    { type: String, required: true },
  email:    { type: String },

  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true }, // "09:30"
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' },
  note:   { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
