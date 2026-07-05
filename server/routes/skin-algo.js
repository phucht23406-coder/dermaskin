// server/routes/skin-algo.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Dùng lại kết nối mongoose từ index.js
// Schema sản phẩm (đơn giản hóa để query)
const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  skinTypes: [String],
  skinConcerns: [String],
  isActive: Boolean,
  images: [{ imageUrl: String, isPrimary: Boolean }],
  variants: [{ price: Number, salePrice: Number, variantName: String }]
});
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Bảng mapping đáp án → loại da
const skinTypeMap = {
  'A': { loai_da: 'Da dầu',      skinTypes: ['da_dau'],       skinConcerns: ['mun','tham_mun'] },
  'B': { loai_da: 'Da khô',      skinTypes: ['da_kho'],       skinConcerns: ['thieu_am'] },
  'C': { loai_da: 'Da hỗn hợp', skinTypes: ['da_hon_hop'],   skinConcerns: ['mun','thieu_am'] },
  'D': { loai_da: 'Da nhạy cảm',skinTypes: ['da_nhay_cam'],  skinConcerns: ['nhay_cam'] },
  'E': { loai_da: 'Da thường',   skinTypes: ['da_thuong'],    skinConcerns: [] }
};

// POST /api/skin-algo/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Vui lòng cung cấp mảng đáp án.' });
    }

    // Đếm ký tự xuất hiện nhiều nhất
    const count = {};
    for (const ans of answers) {
      count[ans] = (count[ans] || 0) + 1;
    }
    const dominantKey = Object.keys(count).reduce((a, b) =>
      count[a] >= count[b] ? a : b
    );

    const skinInfo = skinTypeMap[dominantKey] || skinTypeMap['E'];

    // Query sản phẩm phù hợp
    const products = await Product.find({
      skinTypes: { $in: skinInfo.skinTypes },
      isActive: true
    })
      .select('_id name slug skinTypes skinConcerns variants images')
      .limit(10);

    const routine = products.map(p => ({
      id: p._id,
      name: p.name,
      slug: p.slug,
      price: p.variants?.[0]?.price || 0,
      salePrice: p.variants?.[0]?.salePrice || null,
      image: p.images?.find(i => i.isPrimary)?.imageUrl || ''
    }));

    return res.json({
      dominant_answer: dominantKey,
      loai_da: skinInfo.loai_da,
      skin_concerns: skinInfo.skinConcerns,
      routine
    });

  } catch (err) {
    console.error('Lỗi skin-algo:', err.message);
    return res.status(500).json({ message: 'Lỗi server.' });
  }
});

module.exports = router;