import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';

interface OrderItem {
  id: number;
  brand: string;
  name: string;
  spec: string;
  quantity: number;
  price: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnDestroy {
  private productService = inject(ProductService);
  private products = this.productService.getAllProducts();

  receiverAddressType = 'Công ty';
  receiverName = 'Nguyễn Quốc Khải';
  receiverPhoneMasked = '*******457';
  receiverAddress = '516 Cách Mạng Tháng Tám, Phường 11, Quận 3, Thành phố Hồ Chí Minh';

  paymentMethod = 'Thanh toán khi nhận hàng (COD)';

  voucherCode = '';
  voucherDiscount = 0;

  note = '';

  orderItems: OrderItem[] = [
    {
      id: 1,
      brand: 'Klairs',
      name: 'Serum Hoa Hồng Klairs Không Mùi Cho Da Nhạy Cảm 50ml',
      spec: '50ml',
      quantity: 2,
      price: 100000,
      image: this.products[0]?.image ?? '',
    },
    {
      id: 2,
      brand: 'Bioderma',
      name: 'Bộ làm sạch ba bước cho da nhạy cảm Bioderma',
      spec: 'Bộ 3 sản phẩm',
      quantity: 1,
      price: 400000,
      image: this.products[2]?.image ?? '',
    },
  ];

  shippingFee = 0;

  toastMessage: string | null = null;
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this.toastTimeoutId);
  }

  get subtotal(): number {
    return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get total(): number {
    return this.subtotal - this.voucherDiscount + this.shippingFee;
  }

  applyVoucher(): void {
    this.voucherDiscount = this.voucherDiscount > 0 ? 0 : 10000;
    this.showToast(this.voucherDiscount > 0 ? 'Đã áp dụng mã giảm giá!' : 'Đã bỏ mã giảm giá!');
  }

  placeOrder(): void {
    this.showToast('Đặt hàng thành công!');
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = setTimeout(() => {
      this.toastMessage = null;
    }, 2500);
  }
}
