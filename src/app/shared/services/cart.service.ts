import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('app_cart');
      if (savedCart) {
        this.cartItemsSubject.next(JSON.parse(savedCart));
      }
    }
  }

  public saveCart(items: any[]) {
    this.cartItemsSubject.next(items);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('app_cart', JSON.stringify(items));
    }
  }

  public getCartItems() {
    return this.cartItemsSubject.value;
  }

  // Nhận duy nhất 1 tham số là Object chứa đầy đủ thông tin từ trang chi tiết sản phẩm truyền qua
  public addToCart(product: any) {
    const currentItems = [...this.getCartItems()];
    
    // Tìm xem sản phẩm cùng Loại da và Dung tích đã có trong giỏ hàng chưa
    const existingIndex = currentItems.findIndex(item => 
      item.id === product.id && 
      item.selectedSkinType === product.selectedSkinType && 
      item.selectedCapacity === product.selectedCapacity
    );

    if (existingIndex > -1) {
      
      currentItems[existingIndex].quantity += product.quantity;
    } else {
   
      currentItems.push(product);
    }

    this.saveCart(currentItems);
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
  }

  //số lượng tăng/giảm trực tiếp từ trang giỏ hàng
  public updateQuantity(productId: number, skinType: string, capacity: string, newQty: number) {
    const currentItems = [...this.getCartItems()];
    const itemIndex = currentItems.findIndex(item => 
      item.id === productId && 
      item.selectedSkinType === skinType && 
      item.selectedCapacity === capacity
    );

    if (itemIndex > -1 && newQty >= 1) {
      currentItems[itemIndex].quantity = newQty;
      this.saveCart(currentItems);
    }
  }

  //xóa sản phẩm khỏi giỏ hàng 
  public removeFromCart(productId: number, skinType: string, capacity: string) {
    const currentItems = this.getCartItems().filter(item => 
      !(item.id === productId && item.selectedSkinType === skinType && item.selectedCapacity === capacity)
    );
    this.saveCart(currentItems);
  }
}
