// models/Review.js — collection reviews (đánh giá sản phẩm)
// Tách collection riêng (KHÔNG nhúng vào product) vì số đánh giá lớn & không giới hạn.
const mongoose = require('mongoose');

// review_images (ERD) -> NHÚNG
const reviewImageSchema = new mongoose.Schema({
  imageUrl:  { type: String, required: true },
  sortOrder: { type: Number, default: 0 }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  orderId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // để xác minh đã mua hàng thật
  rating:    { type: Number, min: 1, max: 5, required: true },
  title:     { type: String },
  content:   { type: String },
  images:    [reviewImageSchema],
  isVerifiedPurchase: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
