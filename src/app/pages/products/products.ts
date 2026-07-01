/* ================================================================
   products.ts
   ProductsComponent — standalone Angular component
================================================================= */

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

/* ================================================================
   INTERFACES
================================================================= */

export interface Category {
  id: string;
  name: string;
  active?: boolean;
  hasBadge?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  soldCount: number;
  isFavorite: boolean;
}

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

/* ================================================================
   COMPONENT
================================================================= */

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit, OnDestroy {
  /* ============================= */
  /* CATEGORY SIDEBAR MOCK DATA */
  /* ============================= */
  categories: Category[] = [
    { id: 'cat-makeup', name: 'Trang điểm', active: true },
    { id: 'cat-facial-care', name: 'Chăm sóc da mặt' },
    { id: 'cat-body-care', name: 'Chăm sóc cơ thể' },
    { id: 'cat-hair-care', name: 'Chăm sóc tóc', hasBadge: true },
    { id: 'cat-personal-care', name: 'Chăm sóc cá nhân' },
    { id: 'cat-services', name: 'Dịch vụ và đặt lịch' },
  ];

  /* ============================= */
  /* PRICE FILTER STATE */
  /* ============================= */
  priceFrom: number | null = null;
  priceTo: number | null = null;

  /* ============================= */
  /* FLASH SALE COUNTDOWN TIMER */
  /* ============================= */
  countdown: CountdownTime = { hours: 12, minutes: 0, seconds: 0 };
  private countdownIntervalId: ReturnType<typeof setInterval> | null = null;

  /* ============================= */
  /* PRODUCT GRID MOCK DATA */
  /* ============================= */
  products: Product[] = [
    {
      id: 'prod-001',
      name: 'Sữa Rửa Mặt Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-002',
      name: 'Kem Dưỡng Ẩm Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-003',
      name: 'Tinh Chất Dưỡng Da Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-004',
      name: 'Toner Cân Bằng Da Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-005',
      name: 'Mặt Nạ Dưỡng Da Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-006',
      name: 'Kem Chống Nắng Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-007',
      name: 'Serum Trị Mụn Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-008',
      name: 'Gel Rửa Mặt Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-009',
      name: 'Xịt Khoáng Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-010',
      name: 'Sữa Dưỡng Thể Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-011',
      name: 'Dầu Gội Thảo Dược Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
    {
      id: 'prod-012',
      name: 'Son Dưỡng Môi Dermaskin',
      description: 'Mô tả sản phẩm',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
      price: 22000,
      originalPrice: 54000,
      discountPercent: 51,
      rating: 5.0,
      soldCount: 12340,
      isFavorite: false,
    },
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  /* ============================= */
  /* LIFECYCLE HOOKS */
  /* ============================= */
  goToDetail(productId: any) {
  this.router.navigate(['/product-detail'], { state: { productId: productId } });
  }
  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  /* ============================= */
  /* COUNTDOWN TIMER LOGIC */
  /* ============================= */

  private startCountdown(): void {
    this.stopCountdown();

    this.countdownIntervalId = setInterval(() => {
      this.decrementCountdown();
      this.cdr.markForCheck();
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownIntervalId !== null) {
      clearInterval(this.countdownIntervalId);
      this.countdownIntervalId = null;
    }
  }

  private decrementCountdown(): void {
    let { hours, minutes, seconds } = this.countdown;

    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      // Countdown finished — reset to a new 12-hour cycle.
      hours = 12;
      minutes = 0;
      seconds = 0;
    }

    this.countdown = { hours, minutes, seconds };
  }

  /** Zero-pads a countdown segment for display, e.g. 5 -> "05". */
  formatCountdownSegment(value: number): string {
    return value.toString().padStart(2, '0');
  }

  /* ============================= */
  /* PRICE FILTER ACTIONS */
  /* ============================= */

  applyPriceFilter(): void {
    // Hook for real filtering logic (e.g. calling a ProductService
    // with this.priceFrom / this.priceTo and updating `this.products`).
    console.log('Applying price filter:', {
      from: this.priceFrom,
      to: this.priceTo,
    });
  }

  /* ============================= */
  /* PRODUCT CARD ACTIONS */
  /* ============================= */

  toggleFavorite(product: Product, event: Event): void {
    event.stopPropagation();
    product.isFavorite = !product.isFavorite;
  }

  buyNow(product: Product, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/product-detail'], {
      state: { productId: product.id },
    });
  }
}
