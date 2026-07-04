// models/Category.js — collection categories (danh mục sản phẩm, có danh mục cha-con)
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  // Quan hệ đệ quy: danh mục cha. null = danh mục gốc cấp 1
  parentId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  imageUrl:    { type: String },
  description: { type: String },
  isActive:    { type: Boolean, default: true },
  sortOrder:   { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
