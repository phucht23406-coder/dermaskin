import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer], 
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  selectedMethod: string = 'bank'; 
  isOtpStep: boolean = false;      
  isSuccess: boolean = false; // Chỉ dùng biến này để điều khiển màn hình cảm ơn

  selectMethod(method: string) {
    if (!this.isOtpStep) {
      this.selectedMethod = method;
    }
  }

  onSubmit() {
    // 1. Nếu chọn Tài khoản ngân hàng
    if (this.selectedMethod === 'bank') {
      if (!this.isOtpStep) {
        this.isOtpStep = true; // Bấm lần 1: Sang thẳng form nhập OTP
      } else {
        this.isSuccess = true; // Bấm lần 2: Sang thẳng màn hình cảm ơn
      }
    } 
    // 2. Nếu chọn Trực tiếp
    else if (this.selectedMethod === 'direct') {
      this.isSuccess = true; // Bấm "Mua ngay" -> Sang thẳng màn hình cảm ơn luôn
    }
  }

  resetPage() {
    this.isSuccess = false;
    this.isOtpStep = false;
    this.selectedMethod = 'bank';
  }
}
