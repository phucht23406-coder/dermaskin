// models/Blog.js — collection blogs (= blog_posts trong ERD)
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  slug:     { type: String, required: true, unique: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String }, // gộp blog_categories thành 1 trường chữ cho gọn (có thể tách bảng nếu cần)

  thumbnailUrl: { type: String },
  excerpt:      { type: String },
  content:      { type: String, required: true },

  // blog_post_products (ERD, N-N) -> mảng ref
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  viewCount:   { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
