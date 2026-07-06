// models/Voucher.js — collection vouchers (mã giảm giá)
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code:             { type: String, required: true, unique: true, uppercase: true },
  name:             { type: String },
  discountType:     { type: String, enum: ['percentage','fixed'], required: true },
  discountValue:    { type: Number, required: true },
  minOrderValue:    { type: Number, default: 0 },
  maxDiscountAmount:{ type: Number, default: null },
  usageLimit:       { type: Number, default: null },
  usedCount:        { type: Number, default: 0 },
  startDate:        { type: Date },
  endDate:          { type: Date },
  isActive:         { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);
