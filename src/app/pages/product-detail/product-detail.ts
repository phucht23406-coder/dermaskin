import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; 
import { ProductService } from '../../shared/services/product.service'; 
import { CartService } from '../../shared/services/cart.service'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  private productService = inject(ProductService); 
  private cartService = inject(CartService); 
  private readonly platformId = inject(PLATFORM_ID);

  product: any = null;
  skinTypes: string[] = ['Da dầu', 'Da khô', 'Da nhạy cảm'];
  capacities: string[] = ['50ml', '100ml', '200ml'];
  quantity: number = 1;
  productThumbnails = [1, 2, 3, 4];

  selectedSkinType: string = this.skinTypes[0];
  selectedCapacity: string = this.capacities[0];
  
  // Biến hứng danh sách sản phẩm liên quan lấy động từ ProductService
  relatedProducts: any[] = []; 

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const productIdStr = params.get('id');
      if (productIdStr) {
        const productId = Number(productIdStr);
        const foundProduct = this.productService.getProductById(productId);
        if (foundProduct) {
          this.product = { ...foundProduct, image: foundProduct.image || foundProduct.imageUrl };
          
          // LẤY DỮ LIỆU ĐỘNG TỪ PRODUCT.SERVICE.TS:
          const allProducts = this.productService.getAllProducts() || [];
          this.relatedProducts = allProducts
            .filter((p: any) => p.id !== productId) // Lọc bỏ sản phẩm đang xem chi tiết
            .map((p: any) => ({
              ...p,
              image: p.image || p.imageUrl // Đảm bảo thuộc tính ảnh chạy mượt
            }))
            .slice(0, 4); // Giới hạn hiển thị tối đa 4 sản phẩm
        } else {
          this.product = null;
          this.relatedProducts = [];
        }
      }
    });
  }

  changeQuantity(amount: number) {
    const nextQty = this.quantity + amount;
    if (nextQty >= 1) { this.quantity = nextQty; }
  }

  selectSkinType(type: string) { this.selectedSkinType = type; }
  selectCapacity(capacity: string) { this.selectedCapacity = capacity; }

  onAddToCart() {
    if (!this.product) return;
    const productToAdd = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: this.quantity,
      selectedSkinType: this.selectedSkinType,
      selectedCapacity: this.selectedCapacity
    };
    this.cartService.addToCart(productToAdd);
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
  }

  onBuyNow() {
    if (!this.product) return;
    this.onAddToCart();
    this.router.navigate(['/cart']);
  }
}
