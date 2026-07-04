// models/Warranty.js
// Gộp 2 model bảo hành trong CÙNG 1 FILE (nhưng vẫn là 2 collection riêng trong DB).
// Cách dùng ở nơi khác:  const { Warranty, WarrantyRequest } = require('./models/Warranty');
const mongoose = require('mongoose');

// ============================================================
// 1) warranties — PHIẾU BẢO HÀNH ĐÃ KÍCH HOẠT
//    (tab "Yêu cầu kích hoạt": SĐT + sản phẩm + serial/mã đơn)
// ============================================================
const warrantySchema = new mongoose.Schema({
  warrantyCode: { type: String, required: true, unique: true },

  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  orderId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, default: null },

  purchasePhone: { type: String, required: true },
  serialNumber:  { type: String },
  orderCode:     { type: String },

  status:     { type: String, enum: ['pending','active','expired','cancelled'], default: 'active' },
  activatedAt:{ type: Date, default: Date.now },
  warrantyPeriodMonths: { type: Number, default: 12 },
  expiryDate: { type: Date },

  note: { type: String }
}, { timestamps: true });

// ============================================================
// 2) warranty_requests — YÊU CẦU / KHIẾU NẠI BẢO HÀNH
//    (tab "Yêu cầu bảo hành" -> sinh request_code để "Tra cứu bảo hành")
// ============================================================
const warrantyRequestSchema = new mongoose.Schema({
  requestCode: { type: String, required: true, unique: true }, // vd: 270317D6Y9ODL

  warrantyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warranty', default: null }, // có thể null
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

  purchasePhone: { type: String, required: true },
  reason:        { type: String },

  status:      { type: String, enum: ['received','processing','resolved','rejected'], default: 'received' },
  handledNote: { type: String }
}, { timestamps: true });

// GỢI Ý sinh mã: 
// const code = Date.now().toString().slice(-6)
//   + Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,7);

const Warranty = mongoose.model('Warranty', warrantySchema);
const WarrantyRequest = mongoose.model('WarrantyRequest', warrantyRequestSchema);

module.exports = { Warranty, WarrantyRequest };
