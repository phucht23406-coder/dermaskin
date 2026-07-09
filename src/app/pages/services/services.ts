import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';

export interface Category {
  id: string;
  name: string;
  active?: boolean;
  hasBadge?: boolean;
}

export interface BookingForm {
  customerName: string;
  customerPhone: string;
  selectedService: string;
  appointmentTime: string;
  selectedBranch: string;
}

export interface BranchItem {
  name: string;
  district: string;
  province: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})
export class Services implements OnInit {
  categories: Category[] = [
    { id: 'ser-facial', name: 'Chăm sóc da mặt chuyên sâu', active: true },
    { id: 'ser-acne', name: 'Liệu trình điều trị mụn' },
    { id: 'ser-whitening', name: 'Tắm trắng & Ủ sáng body' },
  ];

  clinicServices: any[] = []; // Chuyển sang any[] để tránh lỗi ép kiểu chặt từ mock file bên ngoài
  priceFrom: number | null = null;
  priceTo: number | null = null;

  selectedServiceId: number | null = null; 
  currentService: any = null;
  relatedServices: any[] = [];
  isDescExpanded: boolean = false;

  bookingForm: BookingForm = {
    customerName: '',
    customerPhone: '',
    selectedService: '',
    appointmentTime: '',
    selectedBranch: ''
  };

  allBranches: BranchItem[] = [
    { name: 'Chi nhánh Quận 1', district: 'Quận 1', province: 'TP. Hồ Chí Minh' },
    { name: 'Chi nhánh Quận 3', district: 'Quận 3', province: 'TP. Hồ Chí Minh' },
    { name: 'Chi nhánh Cầu Giấy', district: 'Quận Cầu Giấy', province: 'Hà Nội' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllServices();
  }

  private loadAllServices(): void {
    this.clinicServices = this.productService.getClinicServices();
  }

  scrollToBookingForm(): void {
    setTimeout(() => {
      const element = document.getElementById('booking-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  goToDetail(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.currentService = this.clinicServices.find(s => s.id === serviceId) || null;
    
    if (this.currentService) {
      this.relatedServices = this.clinicServices
        .filter(s => s.id !== serviceId)
        .slice(0, 4);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bookNow(service: any, event: Event): void {
    event.stopPropagation();
    this.goToDetail(service.id);
  }

  backToGrid(): void {
    this.selectedServiceId = null;
    this.currentService = null;
    this.isDescExpanded = false;
  }

  applyPriceFilter(): void {
    console.log('Applying service price filter:', {
      from: this.priceFrom,
      to: this.priceTo,
    });
  }

  toggleFavorite(service: any, event: Event): void {
    event.stopPropagation();
    service.isFavorite = !service.isFavorite;
    this.productService.toggleFavorite(service.id);
    
    if (this.currentService && this.currentService.id === service.id) {
      this.currentService.isFavorite = service.isFavorite;
    }
  }

  submitBooking(): void {
    if (!this.bookingForm.customerName || !this.bookingForm.customerPhone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại để đặt lịch hẹn!');
      return;
    }
    alert(`Chúc mừng ${this.bookingForm.customerName}! Bạn đã đặt lịch hẹn thành công.`);
    this.bookingForm = {
      customerName: '',
      customerPhone: '',
      selectedService: '',
      appointmentTime: '',
      selectedBranch: ''
    };
  }
}
