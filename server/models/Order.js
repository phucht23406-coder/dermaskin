// models/Order.js — collection orders
const mongoose = require('mongoose');

// order_items (ERD) -> NHÚNG (snapshot tại thời điểm mua)
const orderItemSchema = new mongoose.Schema({
  productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variantId:   { type: mongoose.Schema.Types.ObjectId }, // id của biến thể đã nhúng trong product
  productName: { type: String, required: true },
  variantName: { type: String },
  unitPrice:   { type: Number, required: true },
  quantity:    { type: Number, required: true, min: 1 },
  subtotal:    { type: Number, required: true }
}, { _id: true });

const orderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true, unique: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null = khách vãng lai
  voucherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', default: null }, // ERD R22

  recipientName:   { type: String, required: true },
  recipientPhone:  { type: String, required: true },
  shippingAddress: { type: String, required: true },
  province: String, district: String, ward: String,

  items: [orderItemSchema], // gộp order_items

  subtotal:       { type: Number, required: true },
  shippingFee:    { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount:    { type: Number, required: true },

  // payments (ERD): với MVP gộp trạng thái vào đây; tách collection riêng khi dùng cổng thật
  paymentMethod: { type: String, enum: ['cod','bank_transfer','momo','vnpay'], default: 'cod' },
  paymentStatus: { type: String, enum: ['unpaid','paid','refunded'], default: 'unpaid' },

  status: { type: String, enum: ['pending','confirmed','processing','shipping','delivered','cancelled','returned'], default: 'pending' },
  note: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
