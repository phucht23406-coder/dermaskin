import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth {
  step: number = 2;

  // Form đăng ký
  registerData = { username: '', email: '', password: '', confirmPassword: '' };

  // Form đăng nhập
  loginData = { email: '', password: '' };

  // Form quên mật khẩu
  forgotEmail = '';
  resetData = { email: '', otp: '', newPassword: '', confirmNewPassword: '' };

  // Thông báo
  message = '';
  isError = false;

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  goToStep(newStep: number) {
    this.step = newStep;
    this.message = '';
  }

  redirectTo(url: string) {
    window.location.href = url;
  }

  // ĐĂNG KÝ
  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.message = 'Mật khẩu xác nhận không khớp!';
      this.isError = true;
      return;
    }
    this.http.post(`${this.apiUrl}/register`, {
      username: this.registerData.username,
      email: this.registerData.email,
      password: this.registerData.password
    }).subscribe({
      next: (res: any) => {
        this.message = 'Đăng ký thành công! Vui lòng đăng nhập.';
        this.isError = false;
        setTimeout(() => this.goToStep(2), 1500);
      },
      error: (err) => {
        this.message = err.error?.message || 'Đăng ký thất bại!';
        this.isError = true;
      }
    });
  }

  // ĐĂNG NHẬP
  onLogin() {
    this.http.post(`${this.apiUrl}/login`, {
      email: this.loginData.email,
      password: this.loginData.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_email', this.loginData.email);
        this.message = 'Đăng nhập thành công!';
        this.isError = false;
        alert('Đăng nhập thành công!');
      },
      error: (err) => {
        this.message = err.error?.message || 'Đăng nhập thất bại!';
        this.isError = true;
      }
    });
  }

  // QUÊN MẬT KHẨU
  onForgotPassword() {
    this.http.post(`${this.apiUrl}/forgot-password`, {
      email: this.forgotEmail
    }).subscribe({
      next: (res: any) => {
        this.resetData.email = this.forgotEmail;
        this.message = `Mã OTP: ${res.otp}`;
        this.isError = false;
        setTimeout(() => this.goToStep(5), 1500);
      },
      error: (err) => {
        this.message = err.error?.message || 'Không tìm thấy email!';
        this.isError = true;
      }
    });
  }

  // ĐẶT LẠI MẬT KHẨU
  onResetPassword() {
    if (this.resetData.newPassword !== this.resetData.confirmNewPassword) {
      this.message = 'Mật khẩu xác nhận không khớp!';
      this.isError = true;
      return;
    }
    this.http.post(`${this.apiUrl}/reset-password`, {
      email: this.resetData.email,
      otp: this.resetData.otp,
      newPassword: this.resetData.newPassword
    }).subscribe({
      next: () => {
        this.message = 'Đổi mật khẩu thành công!';
        this.isError = false;
        setTimeout(() => this.goToStep(2), 1500);
      },
      error: (err) => {
        this.message = err.error?.message || 'OTP không hợp lệ!';
        this.isError = true;
      }
    });
  }

  onOtpVerify(event: any) {
    console.log('OTP:', event.target.value);
  }
}