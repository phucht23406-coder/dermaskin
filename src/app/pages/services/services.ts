// services.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  salesCount: number;
  image: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services implements OnInit {
  // Flag điều khiển hiển thị view
  isDetailView: boolean = false;
  
  // Dịch vụ đang được chọn để xem chi tiết
  selectedService: ServiceItem | null = null;

  // Mock Data: Danh sách dịch vụ chính
  servicesList: ServiceItem[] = [
    {
      id: 1,
      name: 'Liệu trình trẻ hóa da Carbon',
      description: 'Giúp se khít lỗ chân lông, làm sạch sâu và trẻ hóa làn da tức thì bằng công nghệ Laser Carbon.',
      price: 230000,
      oldPrice: 290000,
      discount: '-20%',
      rating: 4.8,
      salesCount: 1234,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    },
    {
      id: 2,
      name: 'Nặn mụn chuẩn y khoa',
      description: 'Lấy sạch nhân mụn, sát khuẩn điện di giúp giảm sưng viêm và không để lại sẹo thâm.',
      price: 150000,
      oldPrice: 200000,
      discount: '-25%',
      rating: 5.0,
      salesCount: 850,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    },
    {
      id: 3,
      name: 'Gội đầu dưỡng sinh',
      description: 'Kết hợp massage ấn huyệt giúp giảm căng thẳng, mệt mỏi và chăm sóc tóc từ gốc.',
      price: 99000,
      oldPrice: 150000,
      discount: '-34%',
      rating: 4.9,
      salesCount: 2100,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    },
    {
      id: 4,
      name: 'Triệt lông vĩnh viễn Diode Laser',
      description: 'Công nghệ triệt lông hiện đại nhất không gây đau rát, an toàn cho mọi vùng da.',
      price: 500000,
      oldPrice: 1000000,
      discount: '-50%',
      rating: 4.7,
      salesCount: 540,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    }
  ];

  // Mock Data: Sản phẩm/Dịch vụ liên quan
  relatedServices: ServiceItem[] = [
    {
      id: 101,
      name: 'Serum phục hồi Dermaskin',
      description: 'Cung cấp độ ẩm và phục hồi hàng rào bảo vệ da sau liệu trình.',
      price: 350000,
      oldPrice: 450000,
      discount: '-22%',
      rating: 5.0,
      salesCount: 320,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    },
    {
      id: 102,
      name: 'Kem chống nắng vật lý',
      description: 'Bảo vệ da tối ưu dưới tác động của tia UV và ánh sáng xanh.',
      price: 420000,
      oldPrice: 550000,
      discount: '-23%',
      rating: 4.8,
      salesCount: 150,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Khởi tạo scroll lên đầu trang khi load component
    window.scrollTo(0, 0);
  }

  /**
   * Mở xem chi tiết một dịch vụ
   * @param service Đối tượng dịch vụ được click
   */
  openServiceDetail(service: ServiceItem): void {
    this.selectedService = service;
    this.isDetailView = true;
    // Cuộn lên đầu trang khi xem chi tiết
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Quay lại danh sách dịch vụ
   */
  closeDetailView(): void {
    this.isDetailView = false;
    this.selectedService = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Logic giả lập thêm vào giỏ hàng hoặc đặt hẹn
   */
  handleBooking(): void {
    if (this.selectedService) {
      alert(`Đang tiến hành đặt hẹn cho dịch vụ: ${this.selectedService.name}`);
    }
  }
}