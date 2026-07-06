const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// --- 1. KẾT NỐI MONGODB LOCAL ---
mongoose.connect('mongodb://localhost:27017/my_project')
  .then(() => console.log('Đã kết nối tới MongoDB Local thành công!'))
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

// --- SCHEMA: Lịch hẹn dịch vụ (Appointment) ---
const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  serviceName: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  note: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });
const Appointment = mongoose.model('Appointment', appointmentSchema);

// --- SCHEMA: Bảo hành (Warranty) ---
const warrantySchema = new mongoose.Schema({
  warrantyCode: { type: String, required: true, unique: true }, // Mã bảo hành, sinh tự động
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  productName: { type: String, required: true },
  reason: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'processing', 'resolved'], default: 'pending' }
}, { timestamps: true });
const Warranty = mongoose.model('Warranty', warrantySchema);

// Hàm tự sinh mã bảo hành ngẫu nhiên, dạng: BH + 6 số cuối timestamp + 6 ký tự random
function generateWarrantyCode() {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return 'BH' + Date.now().toString().slice(-6) + randomStr;
}

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

// --- 4. API ĐẶT LỊCH HẸN DỊCH VỤ ---

// API: Nhận thông tin từ Form Đặt lịch hẹn -> Lưu vào bảng appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { fullName, phone, email, serviceName, appointmentDate, appointmentTime, note } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !phone || !serviceName || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc!' });
    }

    const newAppointment = new Appointment({
      fullName, phone, email, serviceName, appointmentDate, appointmentTime, note
    });
    await newAppointment.save();

    res.status(201).json({ message: 'Đặt lịch hẹn thành công!', data: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// --- 5. API BẢO HÀNH ---

// API: Nhận thông tin từ Form yêu cầu bảo hành -> Lưu vào bảng warranty + tự sinh mã bảo hành
app.post('/api/warranties', async (req, res) => {
  try {
    const { fullName, phone, email, productName, reason } = req.body;

    if (!fullName || !phone || !productName) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc!' });
    }

    const warrantyCode = generateWarrantyCode();

    const newWarranty = new Warranty({
      warrantyCode, fullName, phone, email, productName, reason
    });
    await newWarranty.save();

    res.status(201).json({
      message: 'Gửi yêu cầu bảo hành thành công!',
      warrantyCode: newWarranty.warrantyCode,
      data: newWarranty
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API: Nhận mã bảo hành khách nhập -> Tìm kiếm và trả về thông tin tra cứu bảo hành
app.get('/api/warranties/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const warranty = await Warranty.findOne({ warrantyCode: code });

    if (!warranty) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin bảo hành với mã này!' });
    }

    res.status(200).json({ message: 'Tìm thấy thông tin bảo hành!', data: warranty });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Server đang chạy tại: http://localhost:${PORT}`);
});