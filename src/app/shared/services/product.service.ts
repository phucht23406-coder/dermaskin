import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private products: any[] = [
    {
      id: 1,
  name: 'Tinh chất dưỡng sáng Vitamin C',
  price: 550000,
  originalPrice: 750000,
  discountPercent: 26,
  image: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=500&q=80',
  description: 'Mờ thâm mụn, dưỡng sáng da và chống oxy hóa vượt trội.'
    },
    {
      id: 2,
      name: 'Tinh chất Serum Phục Hồi B5',
      price: 450000,
      originalPrice: 600000,
      discountPercent: 25,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      description: 'Tinh chất cấp ẩm chuyên sâu, làm dịu da kích ứng và phục hồi hàng rào bảo vệ da.'
    },
    {
      id: 3,
      name: 'Kem Chống Nắng Kiềm Dầu',
      price: 380000,
      originalPrice: 500000,
      discountPercent: 24,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80',
      description: 'Bảo vệ da tối ưu khỏi tia UVA/UVB với kết cấu mỏng nhẹ, không gây bít tắc.'
    },
    {
      id: 11,
  name: 'Kem dưỡng ẩm chuyên sâu ban đêm',
  price: 680000,
  originalPrice: 850000,
  discountPercent: 20,
  image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
  description: 'Nuôi dưỡng da mịn màng, ngăn ngừa các dấu hiệu lão hóa sớm.'
    },
    {
      id: 5,
      name: 'Kem Dưỡng Ẩm Cấp Nước',
      price: 520000,
      originalPrice: 750000,
      discountPercent: 30,
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80',
      description: 'Khóa ẩm chuyên sâu 24h, bổ sung dưỡng chất nuôi dưỡng tế bào da.'
    },
    {
      id: 6,
      name: 'Mặt Nạ Đất Sét Thải Độc',
      price: 320000,
      originalPrice: 400000,
      discountPercent: 20,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80',
      description: 'Hút sạch dầu thừa, sợi bã nhờn cứng đầu ẩn sâu dưới lỗ chân lông.'
    },
    {
      id: 7,
      name: 'Tẩy Tế Bào Chết Hóa Học AHA/BHA',
      price: 480000,
      originalPrice: 650000,
      discountPercent: 26,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
      description: 'Loại bỏ lớp sừng già cỗi trên bề mặt da, giảm mụn cám mụn đầu đen.'
    },
    {
      id: 8,
      name: 'Kem Dưỡng Mắt Trị Thâm',
      price: 720000,
      originalPrice: 950000,
      discountPercent: 24,
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=500&q=80',
      description: 'Đánh tan quầng thâm mắt, bọng mắt mệt mỏi và làm mờ các nếp nhăn li ti.'
    }
  ];

  // Mảng dữ liệu dịch vụ mẫu chứa ID dạng số (number) khớp hoàn toàn với file services.ts
  private clinicServices: any[] = [
    { 
      id: 1, 
      name: 'Chăm sóc da chuyên sâu', 
      price: 500000, 
      isFavorite: false,
      description: 'Liệu trình nuôi dưỡng tế bào da chuyên sâu từ bên trong.',
      duration: '60 phút',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
      rating: 5
    },
    { 
      id: 2, 
      name: 'Điều trị mụn chuẩn y khoa', 
      price: 600000, 
      isFavorite: true,
      description: 'Phác đồ điều trị tận gốc hoàn toàn các loại mụn bọc, mụn ẩn.',
      duration: '75 phút',
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=500&q=80',
      rating: 4.9
    },
    { 
      id: 3, 
      name: 'Tắm trắng & Ủ sáng da thảo dược', 
      price: 1200000, 
      isFavorite: false,
      description: 'Liệu pháp bật tông da an toàn, mịn màng tự nhiên nhờ tinh chất thảo mộc.',
      duration: '90 phút',
      imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=80',
      rating: 4.8
    },
    { 
      id: 4, 
      name: 'Massage body thư giãn đá nóng', 
      price: 450000, 
      isFavorite: false,
      description: 'Lưu thông khí huyết, giải tỏa căng thẳng các vùng cơ mệt mỏi với đá nóng núi lửa.',
      duration: '60 phút',
      imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=500&q=80',
      rating: 5
    },
    { 
      id: 5, 
      name: 'Trẻ hóa xóa nhăn nâng cơ Hifu', 
      price: 2500000, 
      isFavorite: false,
      description: 'Công nghệ sóng siêu âm hội tụ giúp nâng cơ mặt và trẻ hóa làn da tức thì.',
      duration: '90 phút',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80',
      rating: 4.9
    }
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }

  getDiscountedProducts() {
    return this.products.filter(p => p.discountPercent > 0);
  }

  getBestSellerProducts() {
    return this.products; 
  }

  getClinicServices() {
    return this.clinicServices;
  }

  toggleFavorite(serviceId: number) {
    const service = this.clinicServices.find(s => s.id === serviceId);
    if (service) {
      service.isFavorite = !service.isFavorite;
      console.log(`Đã chuyển trạng thái yêu thích dịch vụ ${serviceId} thành: ${service.isFavorite}`);
    }
  }
}
