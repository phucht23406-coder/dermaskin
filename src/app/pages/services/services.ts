// services.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// ── Interfaces ──────────────────────────────────────────────
export interface Branch {
  name:      string;
  address:   string;
  province:  string;
  district:  string;
  phone:     string;
  latitude:  number;
  longitude: number;
}

export interface BookingForm {
  customerName:    string;
  customerPhone:   string;
  selectedService: string;
  appointmentTime: string;
  selectedBranch:  string;
}

export interface Review {
  userName: string;
  date:     string;
  rating:   number;
}

export interface RelatedProduct {
  name:          string;
  description:   string;
  price:         string;
  originalPrice: string;
  discount:      string;
  rating:        string;
  sold:          string;
}

// ── Component ────────────────────────────────────────────────
@Component({
  selector:    'app-services',
  standalone:  true,
  imports:     [CommonModule, FormsModule, RouterLink],
  templateUrl: './services.html',
  styleUrls:   ['./services.css'],
})
export class Services implements OnInit {

  // ── Description toggle ──────────────────────────────────
  isDescExpanded = false;

  toggleDesc(): void {
    this.isDescExpanded = !this.isDescExpanded;
  }

  // ── Booking Form ─────────────────────────────────────────
  bookingForm: BookingForm = {
    customerName:    '',
    customerPhone:   '',
    selectedService: '',
    appointmentTime: '',
    selectedBranch:  '',
  };

  submitBooking(): void {
    const { customerName, customerPhone, selectedService, appointmentTime, selectedBranch } = this.bookingForm;

    if (!customerName.trim()) {
      alert('Vui lòng nhập họ và tên.');
      return;
    }
    if (!customerPhone.trim()) {
      alert('Vui lòng nhập số điện thoại.');
      return;
    }
    if (!selectedService) {
      alert('Vui lòng chọn dịch vụ.');
      return;
    }
    if (!appointmentTime) {
      alert('Vui lòng chọn thời gian.');
      return;
    }
    if (!selectedBranch) {
      alert('Vui lòng chọn chi nhánh.');
      return;
    }

    // ── Formal submission payload ──────────────────────────
    const payload = {
      customerName:    customerName.trim(),
      customerPhone:   customerPhone.trim(),
      selectedService,
      appointmentTime,
      selectedBranch,
      submittedAt:     new Date().toISOString(),
    };

    console.log('[DermaSkin] Booking submitted:', payload);

    // TODO: Replace with actual API call, e.g.:
    // this.bookingService.submit(payload).subscribe(...)

    alert(`Đặt lịch thành công!\nChi nhánh: ${selectedBranch}\nThời gian: ${new Date(appointmentTime).toLocaleString('vi-VN')}`);

    this.resetBookingForm();
  }

  private resetBookingForm(): void {
    this.bookingForm = {
      customerName:    '',
      customerPhone:   '',
      selectedService: '',
      appointmentTime: '',
      selectedBranch:  '',
    };
  }

  // ── All 20 Branches ──────────────────────────────────────
  readonly allBranches: Branch[] = [
    { name: 'DermaSkin - Quận 1',        address: '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM',                           province: 'TP. Hồ Chí Minh', district: 'Quận 1',           phone: '028 7300 0001', latitude: 10.7743, longitude: 106.7038 },
    { name: 'DermaSkin - Quận 3',        address: '45 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM',                          province: 'TP. Hồ Chí Minh', district: 'Quận 3',           phone: '028 7300 0002', latitude: 10.7779, longitude: 106.6905 },
    { name: 'DermaSkin - Quận 5',        address: '208 Nguyễn Trãi, P.3, Quận 5, TP.HCM',                                  province: 'TP. Hồ Chí Minh', district: 'Quận 5',           phone: '028 7300 0003', latitude: 10.7546, longitude: 106.6634 },
    { name: 'DermaSkin - Quận 7',        address: '102 Nguyễn Thị Thập, P. Tân Phú, Quận 7, TP.HCM',                       province: 'TP. Hồ Chí Minh', district: 'Quận 7',           phone: '028 7300 0004', latitude: 10.7411, longitude: 106.7019 },
    { name: 'DermaSkin - Quận 10',       address: '350 Đường 3 Tháng 2, P.12, Quận 10, TP.HCM',                            province: 'TP. Hồ Chí Minh', district: 'Quận 10',          phone: '028 7300 0005', latitude: 10.7720, longitude: 106.6700 },
    { name: 'DermaSkin - Bình Thạnh',    address: '88 Điện Biên Phủ, P.15, Q. Bình Thạnh, TP.HCM',                         province: 'TP. Hồ Chí Minh', district: 'Bình Thạnh',       phone: '028 7300 0006', latitude: 10.8009, longitude: 106.7115 },
    { name: 'DermaSkin - Phú Nhuận',     address: '215 Phan Xích Long, P.7, Q. Phú Nhuận, TP.HCM',                         province: 'TP. Hồ Chí Minh', district: 'Phú Nhuận',        phone: '028 7300 0007', latitude: 10.7969, longitude: 106.6886 },
    { name: 'DermaSkin - Tân Bình',      address: '120 Cộng Hòa, P.4, Q. Tân Bình, TP.HCM',                                province: 'TP. Hồ Chí Minh', district: 'Tân Bình',         phone: '028 7300 0008', latitude: 10.8016, longitude: 106.6536 },
    { name: 'DermaSkin - Gò Vấp',        address: '561 Quang Trung, P.10, Q. Gò Vấp, TP.HCM',                              province: 'TP. Hồ Chí Minh', district: 'Gò Vấp',           phone: '028 7300 0009', latitude: 10.8385, longitude: 106.6655 },
    { name: 'DermaSkin - TP. Thủ Đức',   address: '241 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM',                  province: 'TP. Hồ Chí Minh', district: 'TP. Thủ Đức',      phone: '028 7300 0010', latitude: 10.8504, longitude: 106.7560 },
    { name: 'DermaSkin - Quận 6',        address: '99 Hậu Giang, P.5, Quận 6, TP.HCM',                                     province: 'TP. Hồ Chí Minh', district: 'Quận 6',           phone: '028 7300 0011', latitude: 10.7470, longitude: 106.6350 },
    { name: 'DermaSkin - Bình Tân',      address: '475 Kinh Dương Vương, P. An Lạc, Q. Bình Tân, TP.HCM',                  province: 'TP. Hồ Chí Minh', district: 'Bình Tân',         phone: '028 7300 0012', latitude: 10.7480, longitude: 106.6160 },
    { name: 'DermaSkin - Cầu Giấy',      address: '78 Xuân Thủy, P. Dịch Vọng Hậu, Q. Cầu Giấy, Hà Nội',                 province: 'Hà Nội',           district: 'Cầu Giấy',         phone: '024 7300 0013', latitude: 21.0362, longitude: 105.7825 },
    { name: 'DermaSkin - Đống Đa',       address: '155 Chùa Bộc, P. Quang Trung, Q. Đống Đa, Hà Nội',                     province: 'Hà Nội',           district: 'Đống Đa',          phone: '024 7300 0014', latitude: 21.0070, longitude: 105.8270 },
    { name: 'DermaSkin - Hai Bà Trưng',  address: '264 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, Hà Nội',               province: 'Hà Nội',           district: 'Hai Bà Trưng',     phone: '024 7300 0015', latitude: 21.0125, longitude: 105.8490 },
    { name: 'DermaSkin - Hà Đông',       address: '12 Quang Trung, P. Quang Trung, Q. Hà Đông, Hà Nội',                   province: 'Hà Nội',           district: 'Hà Đông',          phone: '024 7300 0016', latitude: 20.9710, longitude: 105.7790 },
    { name: 'DermaSkin - Hải Châu',      address: '255 Lê Duẩn, P. Tân Chính, Q. Hải Châu, Đà Nẵng',                     province: 'Đà Nẵng',          district: 'Hải Châu',         phone: '0236 7300 017', latitude: 16.0678, longitude: 108.2208 },
    { name: 'DermaSkin - Thanh Khê',     address: '410 Điện Biên Phủ, P. Hòa Khê, Q. Thanh Khê, Đà Nẵng',               province: 'Đà Nẵng',          district: 'Thanh Khê',        phone: '0236 7300 018', latitude: 16.0664, longitude: 108.2022 },
    { name: 'DermaSkin - Thủ Dầu Một',   address: '500 Đại lộ Bình Dương, P. Hiệp Thành, TP. Thủ Dầu Một, Bình Dương',  province: 'Bình Dương',       district: 'TP. Thủ Dầu Một', phone: '0274 7300 019', latitude: 10.9804, longitude: 106.6519 },
    { name: 'DermaSkin - Ninh Kiều',     address: '88 Đường 3 Tháng 2, P. Xuân Khánh, Q. Ninh Kiều, Cần Thơ',           province: 'Cần Thơ',          district: 'Ninh Kiều',        phone: '0292 7300 020', latitude: 10.0340, longitude: 105.7880 },
  ];

  // ── Branch Pagination ────────────────────────────────────
  readonly branchPageSize   = 3;
  currentBranchPage         = 0;

  get totalBranchPages(): number {
    return Math.ceil(this.allBranches.length / this.branchPageSize);
  }

  get pagedBranches(): Branch[] {
    const start = this.currentBranchPage * this.branchPageSize;
    return this.allBranches.slice(start, start + this.branchPageSize);
  }

  get branchPageDots(): number[] {
    return Array.from({ length: this.totalBranchPages }, (_, i) => i);
  }

  nextBranchPage(): void {
    if (this.currentBranchPage < this.totalBranchPages - 1) {
      this.currentBranchPage++;
    }
  }

  prevBranchPage(): void {
    if (this.currentBranchPage > 0) {
      this.currentBranchPage--;
    }
  }

  goToBranchPage(index: number): void {
    if (index >= 0 && index < this.totalBranchPages) {
      this.currentBranchPage = index;
    }
  }

  // ── Sample Reviews ───────────────────────────────────────
  readonly sampleReviews: Review[] = [
    { userName: 'Nguyễn Thị Lan',   date: '2024-10-07 14:51', rating: 5 },
    { userName: 'Trần Văn Minh',    date: '2024-10-05 09:30', rating: 5 },
    { userName: 'Phạm Thị Hoa',    date: '2024-09-28 16:20', rating: 4 },
    { userName: 'Lê Quốc Bảo',     date: '2024-09-15 11:05', rating: 5 },
  ];

  // ── Related Products ─────────────────────────────────────
  readonly relatedProducts: RelatedProduct[] = [
    {
      name:          'TÊN SẢN PHẨM',
      description:   'Mô tả sản phẩm',
      price:         '22,000đ',
      originalPrice: '54,000đ',
      discount:      '-51%',
      rating:        '5.0',
      sold:          'Đã bán 12,340 sản phẩm',
    },
    {
      name:          'TÊN SẢN PHẨM',
      description:   'Mô tả sản phẩm',
      price:         '22,000đ',
      originalPrice: '54,000đ',
      discount:      '-51%',
      rating:        '5.0',
      sold:          'Đã bán 12,340 sản phẩm',
    },
    {
      name:          'TÊN SẢN PHẨM',
      description:   'Mô tả sản phẩm',
      price:         '22,000đ',
      originalPrice: '54,000đ',
      discount:      '-51%',
      rating:        '5.0',
      sold:          'Đã bán 12,340 sản phẩm',
    },
    {
      name:          'TÊN SẢN PHẨM',
      description:   'Mô tả sản phẩm',
      price:         '22,000đ',
      originalPrice: '54,000đ',
      discount:      '-51%',
      rating:        '5.0',
      sold:          'Đã bán 12,340 sản phẩm',
    },
  ];

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}