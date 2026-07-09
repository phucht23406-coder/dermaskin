import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';

export interface Category {
  id: string;
  name: string;
  active?: boolean;
  hasBadge?: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html', 
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  
  categories: Category[] = [
    { id: 'ser-facial', name: 'Chăm sóc da mặt chuyên sâu', active: true },
    { id: 'ser-acne', name: 'Liệu trình điều trị mụn' },
    { id: 'ser-whitening', name: 'Tắm trắng & Ủ sáng body' },
    { id: 'ser-relax', name: 'Massage thư giãn', hasBadge: true },
    { id: 'ser-combo', name: 'Combo ưu đãi trọn gói' },
  ];

  priceFrom: number | null = null;
  priceTo: number | null = null;
  
  
  clinicServices: any[] = [];

  constructor(
    private router: Router, 
    private cdr: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadAllServices();
  }

  private loadAllServices(): void {
    const allData = this.productService.getAllProducts(); 
    
    
    this.clinicServices = (allData || []).map(item => {
      const finalImg = item.imageUrl || item.image; 
      return {
        ...item,
        image: finalImg,
        imageUrl: finalImg
      };
    });
    
    this.cdr.detectChanges(); 
  }

  
  goToProductDetail(id: number): void {
    if (id) {
      this.router.navigate(['/product-detail', id.toString()]);
    }
  }

  applyPriceFilter(): void {
    console.log('Applying filter:', { from: this.priceFrom, to: this.priceTo });
  }

  toggleFavorite(service: any, event: Event): void {
    event.stopPropagation(); 
    service.isFavorite = !service.isFavorite; 
    this.productService.toggleFavorite(service.id); 
  }
}
