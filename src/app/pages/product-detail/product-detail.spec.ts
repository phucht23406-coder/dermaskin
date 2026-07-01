import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail'; 
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Vì là Standalone Component nên import trực tiếp vào đây
      imports: [
        ProductDetail, 
        RouterTestingModule, 
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Kiểm tra component có được khởi tạo thành công không
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Kiểm tra logic tăng số lượng
  it('should increment quantity when increaseQty is called', () => {
    const initialQty = component.quantity;
    component.increaseQty();
    expect(component.quantity).toBe(initialQty + 1);
  });

  // Kiểm tra logic giảm số lượng
  it('should decrement quantity when decreaseQty is called', () => {
    component.quantity = 2;
    component.decreaseQty();
    expect(component.quantity).toBe(1);
  });

  // Kiểm tra ràng buộc không cho giảm xuống dưới 1
  it('should not decrement quantity below 1', () => {
    component.quantity = 1;
    component.decreaseQty();
    expect(component.quantity).toBe(1);
  });

  // Kiểm tra việc hiển thị tên sản phẩm từ mock data
  it('should render product name in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productName = compiled.querySelector('.product-name')?.textContent;
    expect(productName).toContain('Tên sản phẩm');
  });

  // Kiểm tra hiển thị giá tiền
  it('should render the correct price', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const priceElement = compiled.querySelector('.current-price')?.textContent;
    // 230,000đ (đã qua pipe number ở bản HTML)
    expect(priceElement).toContain('230,000');
  });
});