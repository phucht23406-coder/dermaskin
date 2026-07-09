import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Thêm Router vào đây
import { ProductService } from '../../shared/services/product.service';
import { Product, ServiceItem } from '../../shared/mocks/product.mock'; 

export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  // Countdown Timer
  hours = 23;
  minutes = 8;
  seconds = 35;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  // Banner slides dots
  totalSlides = 3;
  currentSlide = 0;

  // Khai báo mảng hứng dữ liệu động
  flashSaleProducts: any[] = [];
  bestSellers: any[] = [];
  suggestedProducts: any[] = [];
  clinicServices: any[] = []; 

  // Brand images (Giữ nguyên cấu trúc của bạn)
  brands: Brand[] = [
    { id: 1, name: 'Estee Lauder', imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/cbe4d781b0a8f828694086d4001b97a22a36b566?width=260' },
    { id: 2, name: 'Kiehls', imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/8040a6b328a8df0b5037d04823565be093b1eb79?width=260' },
    { id: 3, name: 'La Roche Posay', imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/4694bbfbca90fbd3ecf8e02b79a515ea667bd486?width=260' },
    { id: 4, name: 'Skinceuticals', imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/4da983d58ec26eef6df9ddc48bda9142ecbd461?width=260' },
    { id: 5, name: 'Innisfree', imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/f48ec3e1e2cf4f039ea8ba7528351d4b6099df3d?width=260' }
  ];

  // Inject Router vào Constructor
  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDataFromService();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // ĐỒNG BỘ DATA ĐỘNG TỪ PRODUCT.SERVICE.TS CỦA BẠN:
  loadDataFromService(): void {
    const rawProducts = this.productService.getAllProducts() || [];

    // Fallback chuẩn hóa ảnh để dùng chung linh hoạt 'image' hoặc 'imageUrl'
    const formattedProducts = rawProducts.map(p => ({
      ...p,
      image: p.image || p.imageUrl,
      imageUrl: p.image || p.imageUrl
    }));

    // 1. Lấy sản phẩm có giảm giá (>0) làm Flash Sale
    this.flashSaleProducts = formattedProducts.filter(p => p.discountPercent > 0);

    // 2. Lấy danh sách sản phẩm bán chạy nhất
    this.bestSellers = [...formattedProducts];

    // 3. Lấy toàn bộ sản phẩm đưa vào mục Gợi ý hôm nay
    this.suggestedProducts = [...formattedProducts];

    // 4. Lấy danh sách dịch vụ Spa/Clinic động
    this.clinicServices = (this.productService.getClinicServices() || []).map(s => ({
      ...s,
      image: s.imageUrl || s.image,
      imageUrl: s.imageUrl || s.image
    }));
  }

  // CHUYỂN HƯỚNG SANG TRANG CHI TIẾT SẢN PHẨM CHUẨN XÁC:
  goToProductDetail(id: number): void {
    if (id) {
      this.router.navigate(['/product-detail', id.toString()]);
    }
  }

  // Logic Carousel (Giữ nguyên của bạn)
  getSlideRange(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  // Countdown Timer Getters (Giữ nguyên của bạn)
  get paddedHours(): string { return String(this.hours).padStart(2, '0'); }
  get paddedMinutes(): string { return String(this.minutes).padStart(2, '0'); }
  get paddedSeconds(): string { return String(this.seconds).padStart(2, '0'); }

  private startCountdown(): void {
    this.timerInterval = setInterval(() => {
      if (this.seconds > 0) { this.seconds--; } 
      else if (this.minutes > 0) { this.minutes = 59; this.seconds = 59; } 
      else if (this.hours > 0) { this.hours--; this.minutes = 59; this.seconds = 59; }
    }, 1000);
  }
}
