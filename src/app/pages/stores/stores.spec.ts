// stores.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Stores } from './stores';
import { By } from '@angular/platform-browser';

describe('Stores', () => {
  let component: Stores;
  let fixture: ComponentFixture<Stores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stores] // Import Standalone Component
    }).compileComponents();

    fixture = TestBed.createComponent(Stores);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Kích hoạt ngOnInit
  });

  // 1. Kiểm tra component có khởi tạo thành công không
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Kiểm tra bộ dữ liệu: Phải có đủ 20 chi nhánh như yêu cầu
  it('should initialize with exactly 20 stores', () => {
    expect(component.stores.length).toBe(20);
  });

  // 3. Kiểm tra logic mặc định: Phải chọn chi nhánh đầu tiên khi load
  it('should select the first store by default on init', () => {
    expect(component.selectedStore).toBeTruthy();
    expect(component.selectedStore?.name).toBe('DermaSkin - Quận 1');
  });

  // 4. Kiểm tra logic tương tác: Click chọn chi nhánh khác
  it('should update selectedStore when a store card is clicked', () => {
    const secondStore = component.stores[1]; // Quận 3
    component.selectStore(secondStore);
    
    expect(component.selectedStore?.name).toBe('DermaSkin - Quận 3');
    expect(component.selectedStore?.district).toBe('Quận 3');
  });

  // 5. Kiểm tra tính toàn vẹn dữ liệu của các store trong mảng
  it('should have required metadata for each store', () => {
    component.stores.forEach((store: any) => {
      expect(store.openingHours).toBe('8:00 - 21:30 hằng ngày');
      expect(store.mapEmbedUrl).toBeDefined();
      expect(store.phone).toBeDefined();
    }); // Kiểm tra định dạng số điện thoại cơ bản
    });
  });

  // 6. Kiểm tra giao diện (DOM): Số lượng card hiển thị phải khớp với mảng dữ liệu
  it('should render 20 store cards in the sidebar', () => {
    const storeCards = fixture.debugElement.queryAll(By.css('.store-card'));
    expect(storeCards.length).toBe(20);
  });

  // 7. Kiểm tra trạng thái Active trong DOM
  it('should apply "active" class to the selected store card', () => {
    const firstCard = fixture.debugElement.query(By.css('.store-card'));
    expect(firstCard.nativeElement.classList.contains('active')).toBeTruthy();
  });
});