// blog.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumbnail: string;
  featured?: boolean;
}

export interface RelatedProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  sold: number;
  image: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  /**
   * Controls which view is rendered:
   * false = Blog Overview (list of all articles)
   * true  = Blog Detail (full article content)
   */
  isDetailView = false;

  /** Mock data for the Blog Overview grid. */
  articles: Article[] = [
    {
      slug: 'dap-mat-na-bao-lau',
      title: 'Đắp Mặt Nạ Bao Lâu Là Đủ? Thời Gian Lý Tưởng Cho Từng Loại',
      excerpt:
        'Đắp mặt nạ càng lâu không có nghĩa là càng tốt. Tìm hiểu thời gian và tần suất đắp mặt nạ chuẩn cho từng loại da để tránh khô căng, kích ứng.',
      category: 'Chăm sóc da',
      date: '02/07/2026',
      thumbnail:
        'https://api.builder.io/api/v1/image/assets/TEMP/fe672e4abdec2b51247456f3079b664dae62ccb1?width=1440',
      featured: true,
    },
    {
      slug: 'top-10-kem-chong-nang',
      title: 'Top 10 Kem Chống Nắng Bán Chạy Nhất Tại DERMASKIN',
      excerpt:
        'Danh sách các loại kem chống nắng được khách hàng tin dùng nhất, phù hợp với nhiều loại da và nhu cầu khác nhau.',
      category: 'Sản phẩm',
      date: '28/06/2026',
      thumbnail:
        'https://api.builder.io/api/v1/image/assets/TEMP/a5364922f92f326aecf4330c3e858b69c1a5e492?width=640',
    },
    {
      slug: 'top-10-kem-duong-trang-da-body',
      title: 'Top 10 Kem Dưỡng Trắng Da Body Hoàn Hảo Cho Các Nàng',
      excerpt:
        'Sở hữu làn da body trắng sáng, đều màu với những gợi ý kem dưỡng được đánh giá cao về hiệu quả và độ an toàn.',
      category: 'Sản phẩm',
      date: '24/06/2026',
      thumbnail:
        'https://api.builder.io/api/v1/image/assets/TEMP/b16b178734fceaa777daed8664c58e3dbd3e0329?width=640',
    },
    {
      slug: 'top-10-serum-trang-da',
      title: 'Top 10 Serum Trắng Da "Thần Thánh" Giá Mềm Mà Cực Hiệu Quả',
      excerpt:
        'Không cần chi quá nhiều tiền, vẫn có thể sở hữu làn da trắng sáng với các loại serum chất lượng, giá thành hợp lý.',
      category: 'Sản phẩm',
      date: '20/06/2026',
      thumbnail:
        'https://api.builder.io/api/v1/image/assets/TEMP/3521ee0ae2f3133419003d0d90fc4b4f113af8b6?width=640',
    },
    {
      slug: 'top-5-dau-goi-kiem-soat-dau',
      title: 'Top 5 Dầu Gội Giúp Kiểm Soát Dầu, Giảm Ngứa Trên Tóc',
      excerpt:
        'Giải pháp cho mái tóc bết dầu, ngứa da đầu với những dòng dầu gội được các chuyên gia da liễu khuyên dùng.',
      category: 'Chăm sóc tóc',
      date: '15/06/2026',
      thumbnail:
        'https://api.builder.io/api/v1/image/assets/TEMP/00ba77f9eb14573bf98fb89e36673783065d1e84?width=640',
    },
  ];

  /** Mock data for popular articles shown in the detail-view sidebar. */
  popularArticles: Article[] = this.articles.filter(
    (article) => article.slug !== 'dap-mat-na-bao-lau'
  );

  /** Mock data for related products shown in the detail-view sidebar. */
  relatedProducts: RelatedProduct[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: 'TÊN SẢN PHẨM',
    description: 'Mô tả sản phẩm',
    price: '22,000đ',
    originalPrice: '54,000đ',
    discount: '-51%',
    rating: 5.0,
    sold: 12340,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/43c07235cab6cf8f3f1a72ba92623a9782f7dc6e?width=600',
  }));

  /** Switches to the Blog Detail view for the target article. */
  openArticleDetail(): void {
    this.isDetailView = true;
    this.scrollToTop();
  }

  /** Returns to the Blog Overview (list) view. */
  backToBlog(): void {
    this.isDetailView = false;
    this.scrollToTop();
  }

  private scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
