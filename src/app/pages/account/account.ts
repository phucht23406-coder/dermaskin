import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.css'] // Chỗ này để .css hay .scss tùy nhóm bồ nha
})
export class Account {
  // 1. Biến quản lý Tab chính (Mặc định ban đầu hiện Thông tin tài khoản)
  // Các tab gồm: 'profile' | 'orders' | 'favorites' | 'vouchers' | 'services'
  currentTab: string = 'profile';

  // 2. Biến quản lý Tab con trong mục Đơn hàng (Mặc định hiện 'Tất cả')
  // Các tab con: 'all' | 'new' | 'processing' | 'shipping' | 'success'
  currentOrderTab: string = 'all';

  // 3. Biến điều khiển ẩn/hiện Modal Đăng xuất popup
  showLogoutModal: boolean = false;

  // Hàm click để chuyển đổi Tab chính bên trái
  selectTab(tabName: string) {
    if (tabName === 'logout') {
      this.showLogoutModal = true; // Bấm Đăng xuất thì dựng cái Popup lên
    } else {
      this.currentTab = tabName; // Bấm các mục khác thì đổi tab bình thường
    }
  }

  // Hàm click để chuyển đổi Tab Đơn hàng nhỏ bên phải
  selectOrderTab(orderTabName: string) {
    this.currentOrderTab = orderTabName;
  }

  // Hàm bấm nút "Hủy" trên Popup Đăng xuất
  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  // Hàm bấm nút "Đăng xuất" thật sự trên Popup
  confirmLogout() {
    alert('Đã xử lý đăng xuất thành công!');
    this.showLogoutModal = false;
  }
}