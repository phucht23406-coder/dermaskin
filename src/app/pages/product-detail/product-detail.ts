import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  // Dữ liệu sản phẩm chính
  product = {
    name: 'Tên sản phẩm',
    price: 230000,
    oldPrice: 290000,
    rating: 4.8,
    totalReviews: 82,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tellus dolor, congue nec mollis et, aliquet vitae sapien. Maecenas bibendum risus eget nisl dapibus, quis placerat quam interdum. Ut lobortis erat eget sem vulputate, eu maximus ipsum varius. Donec tempor, magna ac vestibulum euismod, quam felis scelerisque elit, vitae mattis sapien mi ac sem. Nam eleifend mauris lorem, a mollis sapien efficitur et. Donec elit nulla, ullamcorper a nulla sed, bibendum auctor nisi. Cras eleifend sagittis risus id ultrices. Donec quis mattis ipsum. Nullam egestas accumsan viverra. Donec facilisis urna nulla, at facilisis velit aliquet mollis. Fusce sit amet purus eget quam aliquet ultrices. Cras sed lacus sed arcu molestie vehicula et in ligula. Suspendisse quis odio lobortis, tristique sem ut, volutpat metus. Nullam porttitor volutpat lorem, ac ultrices tellus dictum vel. Sed maximus, tortor ac laoreet tincidunt, arcu mi porta massa, a luctus eros lacus bibendum lorem.`,
  };

  // Các lựa chọn phân loại
  skinTypes: string[] = ['Da dầu', 'Da khô', 'Da nhạy cảm'];
  capacities: string[] = ['50ml', '100ml', '200ml'];
  
  // Logic số lượng
  quantity: number = 1;

  // Ảnh thumbnails
  productThumbnails = [1, 2, 3, 4]; // Placeholder cho 4 ảnh nhỏ

  // Thống kê đánh giá
  ratingStats = [
    { stars: 5, count: 12, percent: 80 },
    { stars: 4, count: 3, percent: 20 },
    { stars: 3, count: 0, percent: 0 },
    { stars: 2, count: 0, percent: 0 },
    { stars: 1, count: 0, percent: 0 }
  ];

  // Danh sách bình luận mẫu
  reviews = [
    {
      userName: "User's name",
      rating: 5,
      date: "2024-10-07 14:51",
      variant: "hồng",
      comment: "" // Trong thiết kế là các placeholder line
    },
    {
      userName: "User's name",
      rating: 5,
      date: "2024-10-07 14:51",
      variant: "hồng",
      comment: ""
    },
    {
      userName: "User's name",
      rating: 5,
      date: "2024-10-07 14:51",
      variant: "hồng",
      comment: ""
    }
  ];

  // Sản phẩm liên quan
  relatedProducts = [
    { id: 1, name: 'TÊN SẢN PHẨM', price: 22000, oldPrice: 54000, discount: '-51%', rating: 5.0, sold: 12340 },
    { id: 2, name: 'TÊN SẢN PHẨM', price: 22000, oldPrice: 54000, discount: '-51%', rating: 5.0, sold: 12340 },
    { id: 3, name: 'TÊN SẢN PHẨM', price: 22000, oldPrice: 54000, discount: '-51%', rating: 5.0, sold: 12340 },
    { id: 4, name: 'TÊN SẢN PHẨM', price: 22000, oldPrice: 54000, discount: '-51%', rating: 5.0, sold: 12340 }
  ];

  constructor() {}

  ngOnInit(): void {
    // Scroll lên đầu trang khi vào chi tiết sản phẩm
    window.scrollTo(0, 0);
  }

  // Tăng số lượng
  increaseQty() {
    this.quantity++;
  }

  // Giảm số lượng (không thấp hơn 1)
  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}