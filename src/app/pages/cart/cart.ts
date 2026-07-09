import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { CartService } from '../../shared/services/cart.service'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private cartService = inject(CartService); 

  cartItems: any[] = [];

  ngOnInit(): void {
    // luồng dữ liệu thay đổi thực tế từ service
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Tăng hoặc giảm số lượng sản phẩm 
  changeQty(item: any, amount: number) {
    const nextQty = item.quantity + amount;
    if (nextQty >= 1) {
      this.cartService.updateQuantity(item.id, item.selectedSkinType, item.selectedCapacity, nextQty);
    }
  }

  // Xóa sản phẩm ra khỏi giỏ hàng khi người dùng bấm nút xóa 
  removeItem(item: any) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      this.cartService.removeFromCart(item.id, item.selectedSkinType, item.selectedCapacity);
    }
  }

  // Hàm tính tổng số tiền tạm tính của toàn bộ giỏ hàng
  get subTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Tính tổng hóa đơn cuối cùng phải thanh toán
  get totalAmount(): number {
    return this.subTotal;
  }
}
