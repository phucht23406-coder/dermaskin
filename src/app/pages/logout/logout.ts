import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  imports: [CommonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  showPopup = true;

  confirmLogout() {
    alert('Đã đăng xuất!');
  }

  cancelLogout() {
    this.showPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }
}