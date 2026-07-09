
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number; 
  originalPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  image?: string; 
  rating: number;
  soldCount: number;
  isFavorite?: boolean;
  tags: ('uu-dai' | 'hang-moi' | 'ban-chay')[]; 
}


export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string; 
  imageUrl: string;
  image?: string; 
  rating: number;
  isFavorite?: boolean; 
}


export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Sữa Rửa Mặt Dịu Nhẹ Dermaskin',
    description: 'Làm sạch sâu bụi bẩn, bã nhờn mà không gây khô da, phù hợp cho da nhạy cảm.',
    price: 180000,
    originalPrice: 250000,
    discountPercent: 28,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    soldCount: 2450,
    isFavorite: false,
    tags: ['uu-dai', 'hang-moi']
  },
  {
    id: 2,
    name: 'Kem Dưỡng Ẩm Chuyên Sâu 24h',
    description: 'Cấp ẩm tức thì, khóa ẩm suốt 24 giờ giúp da luôn căng bóng, mịn màng.',
    price: 320000,
    originalPrice: 450000,
    discountPercent: 29,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    soldCount: 4120,
    isFavorite: true,
    tags: ['ban-chay']
  },
  {
    id: 3,
    name: 'Tinh Chất Phục Hồi & Trẻ Hóa B5',
    description: 'Serum chứa Vitamin B5 giúp làm dịu kích ứng, tái tạo tế bào và phục hồi hàng rào bảo vệ da.',
    price: 450000,
    originalPrice: 600000,
    discountPercent: 25,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    soldCount: 980,
    isFavorite: false,
    tags: ['uu-dai', 'ban-chay']
  },
  {
    id: 4,
    name: 'Kem Chống Nắng Phổ Rộng SPF 50+',
    description: 'Bảo vệ da toàn diện trước tia UVA/UVB, nâng tông tự nhiên và kiềm dầu cực tốt.',
    price: 290000,
    originalPrice: 380000,
    discountPercent: 23,
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    soldCount: 1850,
    isFavorite: false,
    tags: ['hang-moi']
  },
  {
    id: 5,
    name: 'Nước Tẩy Trang Sạch Sâu Micellar',
    description: 'Tẩy sạch lớp trang điểm cứng đầu và bụi mịn PM2.5 một cách dịu nhẹ nhất.',
    price: 150000,
    originalPrice: 220000,
    discountPercent: 31,
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    soldCount: 3100,
    isFavorite: false,
    tags: ['ban-chay', 'uu-dai']
  },
  {
    id: 6,
    name: 'Mặt Nạ Đất Sét Thu Nhỏ Lỗ Chân Lông',
    description: 'Hút sạch dầu thừa, làm thông thoáng và se khít lỗ chân Lông hiệu quả sau 2 tuần.',
    price: 210000,
    originalPrice: 210000,
    discountPercent: 0,
    imageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    soldCount: 750,
    isFavorite: false,
    tags: ['hang-moi']
  }
];


export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 101,
    name: 'Liệu trình Chăm sóc da Oxy Tươi',
    description: 'Cung cấp oxy tinh khiết giúp thải độc da, xóa mờ nếp nhăn và làm da trắng hồng rạng rỡ.',
    price: 350000,
    duration: '60 phút',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 102,
    name: 'Massage Body Đá Nóng Thụy Điển',
    description: 'Kết hợp tinh dầu tự nhiên và đá núi lửa giúp giải tỏa cơ bắp, giảm stress sâu.',
    price: 490000,
    duration: '90 phút',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    isFavorite: false
  },
  {
    id: 103,
    name: 'Trị liệu mụn chuẩn y khoa',
    description: 'Lấy nhân mụn vô khuẩn kết hợp chiếu ánh sáng sinh học giúp kháng viêm, không để lại vết thâm.',
    price: 400000,
    duration: '75 phút',
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    isFavorite: false
  }
];
