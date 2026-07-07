// server/routes/orders.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');


const STATUS_GROUP_MAP = {
  pending:   'moiDat',        // Mới đặt
  confirmed: 'dangXuLy',      // Đang xử lý
  processing:'dangXuLy',      // Đang xử lý
  shipping:  'dangVanChuyen', // Đang vận chuyển
  delivered: 'thanhCong',     // Thành công
  cancelled: 'daHuy',         // Đã hủy
  returned:  'daHuy'          // Đã hủy
};

// GET /api/orders/history/:userId
// Lấy toàn bộ đơn hàng của 1 user, phân loại sẵn thành 5 nhóm theo trạng thái
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'userId không hợp lệ.' });
    }

    // Lấy đơn hàng mới nhất lên trước
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Khởi tạo sẵn 5 mảng rỗng để FE luôn nhận đủ 5 tab, kể cả khi không có đơn nào
    const result = {
      moiDat: [],
      dangXuLy: [],
      dangVanChuyen: [],
      thanhCong: [],
      daHuy: []
    };

    orders.forEach(order => {
      const group = STATUS_GROUP_MAP[order.status];
      if (group) {
        result[group].push(order);
      }
    });

    return res.status(200).json({
      message: 'Lấy lịch sử đơn hàng thành công!',
      total: orders.length,
      data: result
    });
  } catch (error) {
    console.error('Lỗi lấy lịch sử đơn hàng:', error.message);
    return res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
