import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-auth', 
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'] 
})
export class Auth {
  step: number = 1;

  goToStep(newStep: number) {
    this.step = newStep;
  }

  redirectTo(url: string) {
    window.location.href = url;
  }

  onLoginSuccess() {
    console.log('Nút đăng nhập đã được bấm!');
  }

  onOtpVerify(event: any) {
    console.log('Đang nhập ký tự OTP...', event.target.value);
  }
}