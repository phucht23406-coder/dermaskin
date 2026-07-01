import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ClinicService {
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

  // Flash Sale Products
  flashSaleProducts: Product[] = [
    {
      id: 1,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 2,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 3,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 4,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
  ];

  // Brand images
  brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/af43793074362ebf7a74649fa5df48d26b4e8e47?width=600',
    },
    {
      id: 2,
      name: 'Brand 2',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/26907c663551703a2a9e05dc54117e96dc392584?width=600',
    },
    {
      id: 3,
      name: 'Brand 3',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/de6c542b043056805a459af3e5b79a52285e3dd5?width=600',
    },
    {
      id: 4,
      name: 'Brand 4',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/4ea7c665e51aa73420d66ca1d86194385f5eed65?width=600',
    },
  ];

  // Best Sellers
  bestSellers: Product[] = [
    {
      id: 1,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 2,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 3,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 4,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
  ];

  // Clinic & Spa services
  clinicServices: Product[] = [
    {
      id: 1,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 2,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 3,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 4,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
  ];

  // Suggested products (2 rows of 4)
  suggestedProducts: Product[] = [
    {
      id: 1,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 2,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 3,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 4,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 5,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 6,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 7,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
    {
      id: 8,
      name: 'TÊN SẢN PHẨM',
      description: 'Mô tả sản phẩm',
      price: '22,000đ',
      originalPrice: '54,000đ',
      discount: '-51%',
      rating: 5.0,
      sold: 12340,
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
    },
  ];

  get paddedHours(): string {
    return String(this.hours).padStart(2, '0');
  }

  get paddedMinutes(): string {
    return String(this.minutes).padStart(2, '0');
  }

  get paddedSeconds(): string {
    return String(this.seconds).padStart(2, '0');
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private startCountdown(): void {
    this.timerInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else if (this.hours > 0) {
        this.hours--;
        this.minutes = 59;
        this.seconds = 59;
      } else {
        clearInterval(this.timerInterval!);
      }
    }, 1000);
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  getSlideRange(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }
}
