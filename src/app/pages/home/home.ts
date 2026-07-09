import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

  // Banner
  totalSlides = 3;
  currentSlide = 0;

  
  flashSaleProducts: Product[] = [];
  bestSellers: Product[] = [];
  suggestedProducts: Product[] = [];
  clinicServices: ServiceItem[] = []; 

  // Brand images 
  brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/af43793074362ebf7a74649fa5df48d26b4e8e47?width=600',
    },
    {
      id: 2,
      name: 'Brand 2',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/26907c663551703a2a9e05dc54117e96dc392584?width=600',
    },
    {
      id: 3,
      name: 'Brand 3',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/de6c542b043056805a459af3e5b79a52285e3dd5?width=600',
    },
    {
      id: 4,
      name: 'Brand 4',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/4ea7c665e51aa73420d66ca1d86194385f5eed65?width=600',
    },
  ];

  // Inject ProductService vào constructor để làm việc với kho dữ liệu chung
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.startCountdown();
    this.loadDataFromService(); 
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  
  private loadDataFromService(): void {
    
    this.flashSaleProducts = this.productService.getDiscountedProducts();

    
    this.bestSellers = this.productService.getBestSellerProducts();

   
    this.suggestedProducts = this.productService.getAllProducts();

    
   this.clinicServices = this.productService.getClinicServices();
  }

  
  get paddedHours(): string {
    return String(this.hours).padStart(2, '0');
  }

  get paddedMinutes(): string {
    return String(this.minutes).padStart(2, '0');
  }

  get paddedSeconds(): string {
    return String(this.seconds).padStart(2, '0');
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
