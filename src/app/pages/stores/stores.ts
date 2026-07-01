// stores.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Store {
  name: string;
  address: string;
  province: string;
  district: string;
  phone: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  imageUrl: string;
  isActive: boolean;
  mapEmbedUrl: SafeResourceUrl; // Angular yêu cầu SafeResourceUrl cho iframe
}

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores.html',
  styleUrls: ['./stores.css']
})
export class Stores implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initStoresData();
    // Mặc định chọn chi nhánh đầu tiên để hiển thị bản đồ
    if (this.stores.length > 0) {
      this.selectedStore = this.stores[0];
    }
  }

  private initStoresData(): void {
    const rawData = [
      { name: 'DermaSkin - Quận 1', address: '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 1', phone: '028 7300 0001', latitude: 10.7743, longitude: 106.7038 },
      { name: 'DermaSkin - Quận 3', address: '45 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 3', phone: '028 7300 0002', latitude: 10.7779, longitude: 106.6905 },
      { name: 'DermaSkin - Quận 5', address: '208 Nguyễn Trãi, P.3, Quận 5, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 5', phone: '028 7300 0003', latitude: 10.7546, longitude: 106.6634 },
      { name: 'DermaSkin - Quận 7', address: '102 Nguyễn Thị Thập, P. Tân Phú, Quận 7, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 7', phone: '028 7300 0004', latitude: 10.7411, longitude: 106.7019 },
      { name: 'DermaSkin - Quận 10', address: '350 Đường 3 Tháng 2, P.12, Quận 10, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 10', phone: '028 7300 0005', latitude: 10.7720, longitude: 106.6700 },
      { name: 'DermaSkin - Bình Thạnh', address: '88 Điện Biên Phủ, P.15, Q. Bình Thạnh, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Bình Thạnh', phone: '028 7300 0006', latitude: 10.8009, longitude: 106.7115 },
      { name: 'DermaSkin - Phú Nhuận', address: '215 Phan Xích Long, P.7, Q. Phú Nhuận, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Phú Nhuận', phone: '028 7300 0007', latitude: 10.7969, longitude: 106.6886 },
      { name: 'DermaSkin - Tân Bình', address: '120 Cộng Hòa, P.4, Q. Tân Bình, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Tân Bình', phone: '028 7300 0008', latitude: 10.8016, longitude: 106.6536 },
      { name: 'DermaSkin - Gò Vấp', address: '561 Quang Trung, P.10, Q. Gò Vấp, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Gò Vấp', phone: '028 7300 0009', latitude: 10.8385, longitude: 106.6655 },
      { name: 'DermaSkin - TP. Thủ Đức', address: '241 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'TP. Thủ Đức', phone: '028 7300 0010', latitude: 10.8504, longitude: 106.7560 },
      { name: 'DermaSkin - Quận 6', address: '99 Hậu Giang, P.5, Quận 6, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Quận 6', phone: '028 7300 0011', latitude: 10.7470, longitude: 106.6350 },
      { name: 'DermaSkin - Bình Tân', address: '475 Kinh Dương Vương, P. An Lạc, Q. Bình Tân, TP.HCM', province: 'TP. Hồ Chí Minh', district: 'Bình Tân', phone: '028 7300 0012', latitude: 10.7480, longitude: 106.6160 },
      { name: 'DermaSkin - Cầu Giấy', address: '78 Xuân Thủy, P. Dịch Vọng Hậu, Q. Cầu Giấy, Hà Nội', province: 'Hà Nội', district: 'Cầu Giấy', phone: '024 7300 0013', latitude: 21.0362, longitude: 105.7825 },
      { name: 'DermaSkin - Đống Đa', address: '155 Chùa Bộc, P. Quang Trung, Q. Đống Đa, Hà Nội', province: 'Hà Nội', district: 'Đống Đa', phone: '024 7300 0014', latitude: 21.0070, longitude: 105.8270 },
      { name: 'DermaSkin - Hai Bà Trưng', address: '264 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, Hà Nội', province: 'Hà Nội', district: 'Hai Bà Trưng', phone: '024 7300 0015', latitude: 21.0125, longitude: 105.8490 },
      { name: 'DermaSkin - Hà Đông', address: '12 Quang Trung, P. Quang Trung, Q. Hà Đông, Hà Nội', province: 'Hà Nội', district: 'Hà Đông', phone: '024 7300 0016', latitude: 20.9710, longitude: 105.7790 },
      { name: 'DermaSkin - Hải Châu', address: '255 Lê Duẩn, P. Tân Chính, Q. Hải Châu, Đà Nẵng', province: 'Đà Nẵng', district: 'Hải Châu', phone: '0236 7300 017', latitude: 16.0678, longitude: 108.2208 },
      { name: 'DermaSkin - Thanh Khê', address: '410 Điện Biên Phủ, P. Hòa Khê, Q. Thanh Khê, Đà Nẵng', province: 'Đà Nẵng', district: 'Thanh Khê', phone: '0236 7300 018', latitude: 16.0664, longitude: 108.2022 },
      { name: 'DermaSkin - Thủ Dầu Một', address: '500 Đại lộ Bình Dương, P. Hiệp Thành, TP. Thủ Dầu Một, Bình Dương', province: 'Bình Dương', district: 'TP. Thủ Dầu Một', phone: '0274 7300 019', latitude: 10.9804, longitude: 106.6519 },
      { name: 'DermaSkin - Ninh Kiều', address: '88 Đường 3 Tháng 2, P. Xuân Khánh, Q. Ninh Kiều, Cần Thơ', province: 'Cần Thơ', district: 'Ninh Kiều', phone: '0292 7300 020', latitude: 10.0340, longitude: 105.7880 },
    ];

    this.stores = rawData.map(item => ({
      ...item,
      openingHours: '8:00 - 21:30 hằng ngày',
      imageUrl: 'assets/images/store-placeholder.png',
      isActive: true,
      mapEmbedUrl: this.generateMapUrl(item.latitude, item.longitude)
    }));
  }

  private generateMapUrl(lat: number, lng: number): SafeResourceUrl {
    // Tạo link embed Google Maps dựa trên tọa độ
    const url = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  selectStore(store: Store): void {
    this.selectedStore = store;
    // Tự động cuộn lên vị trí bản đồ trên thiết bị di động
    if (window.innerWidth < 1200) {
      const mapElement = document.querySelector('.map-view-panel');
      mapElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}