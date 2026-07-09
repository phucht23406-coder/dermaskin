// services.spec.tsimport { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from './services'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
declare const jasmine: any;

describe('Services Component', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;
  let mockProductService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockProductService = {
      getClinicServices: jasmine.createSpy('getClinicServices').and.returnValue([
        {
          id: 101,
          name: 'Liệu trình Chăm sóc da Oxy Tươi',
          description: 'Mô tả dịch vụ',
          imageUrl: 'https://example.com/image.png',
          price: 350000,
          duration: '60 phút',
          rating: 4.9,
          isFavorite: false
        }
      ]),
      toggleFavorite: jasmine.createSpy('toggleFavorite')
    };

   
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        Services,
        FormsModule
      ],
      providers: [
        
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
  });

  it('nên khởi tạo thành công component (should create)', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('nên tự động load danh sách dịch vụ từ ProductService khi khởi tạo', () => {
    fixture.detectChanges();
    expect(mockProductService.getClinicServices).toHaveBeenCalled();
    expect(component.clinicServices.length).toBe(1);
  });

  it('khi ấn vào xem chi tiết nên gọi router để điều hướng sang trang /service-detail với state tương ứng', () => {
    fixture.detectChanges();
    
    
    component.goToDetail(101);
    
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service-detail'], {
      state: { serviceId: 101 }
    });
  });

  it('khi ấn nút Đặt lịch ngay nên điều hướng sang trang chi tiết dịch vụ giống goToDetail', () => {
    fixture.detectChanges();
    const mockEvent = new Event('click');
    const sampleService = component.clinicServices[0];

    component.bookNow(sampleService, mockEvent);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/service-detail'], {
      state: { serviceId: sampleService.id }
    });
  });

  it('khi yêu thích dịch vụ nên gọi hàm toggleFavorite từ ProductService và không làm lan truyền sự kiện click card', () => {
    fixture.detectChanges();
    const mockEvent = new Event('click');
    spyOn(mockEvent, 'stopPropagation'); // Hàm này spy lên event thuần HTML nên chạy bình thường
    const sampleService = component.clinicServices[0];

    component.toggleFavorite(sampleService, mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockProductService.toggleFavorite).toHaveBeenCalledWith(sampleService.id);
  });
});

function spyOn(mockEvent: Event, arg1: string) {
  throw new Error('Function not implemented.');
}
