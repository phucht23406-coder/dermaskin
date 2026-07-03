const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// --- 1. KẾT NỐI MONGODB LOCAL ---
mongoose.connect('mongodb://localhost:27017/my_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Đã kết nối tới MongoDB Local thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// --- 2. TẠO SCHEMA & MODEL ---
const userSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetOtp: { type: String, default: null },
  otpExpires: { type: Date, default: null }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

const profileSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  fullName: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  address: { type: String, default: '' }
});
const Profile = mongoose.model('Profile', profileSchema);

const JWT_SECRET = 'dermaskin_super_secret_key_2026';

// --- 3. CÁC API XÁC THỰC ---

// API: Đăng ký
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc Username đã được sử dụng!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const newProfile = new Profile({ userId: newUser.id });
    await newProfile.save();

    res.status(201).json({ message: 'Đăng ký tài khoản thành công!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API: Đăng nhập
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không chính xác!' });

    const token = jwt.sign({ userId: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Đăng nhập thành công!', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API: Quên mật khẩu (Sinh OTP)
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    res.status(200).json({ message: 'Mã OTP đã được tạo thành công!', otp: otp });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API: Đổi mật khẩu mới
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });
    if (user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Mã OTP không hợp lệ hoặc đã hết hạn!' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Server đang chạy tại: http://localhost:${PORT}`);
});