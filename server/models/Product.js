// models/Product.js — collection products
const mongoose = require('mongoose');

// product_variants (ERD) -> NHÚNG
const variantSchema = new mongoose.Schema({
  sku:           { type: String, required: true },
  variantName:   { type: String },             // "50ml", "Màu đỏ"
  price:         { type: Number, required: true },
  salePrice:     { type: Number, default: null },
  stockQuantity: { type: Number, default: 0 }
}, { _id: true });

// product_images (ERD) -> NHÚNG
const imageSchema = new mongoose.Schema({
  imageUrl:  { type: String, required: true },
  isPrimary: { type: Boolean, default: false }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  slug:             { type: String, required: true, unique: true },

  // Bây giờ tham chiếu (ref) tới collection riêng, đúng theo ERD (R11, R12)
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brandId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },

  shortDescription: { type: String },
  description:      { type: String },
  howToUse:         { type: String },

  images:   [imageSchema],   // nhúng nhiều ảnh
  variants: [variantSchema], // nhúng nhiều biến thể

  // skin_types & skin_concerns (ERD) -> dùng ENUM, không cần bảng riêng
  skinTypes:    [{ type: String, enum: ['da_dau','da_kho','da_hon_hop','da_nhay_cam','da_thuong'] }],
  skinConcerns: [{ type: String, enum: ['mun','tham_mun','lao_hoa','xi_mau','nhay_cam','thieu_am'] }],

  isActive:    { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
  totalSold:   { type: Number, default: 0 },
  avgRating:   { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
