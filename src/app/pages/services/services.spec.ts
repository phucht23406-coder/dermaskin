// services.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from './services';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services] // Vì là Standalone nên import trực tiếp vào đây
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Kiểm tra component có khởi tạo thành công không
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Kiểm tra trạng thái mặc định phải là View Danh sách (isDetailView = false)
  it('should start with listing view (isDetailView = false)', () => {
    expect(component.isDetailView).toBeFalsy();
    expect(component.selectedService).toBeNull();
  });

  // 3. Kiểm tra logic mở View Chi tiết
  it('should switch to detail view when a service is selected', () => {
    const mockService = component.servicesList[0];
    component.openServiceDetail(mockService);
    
    expect(component.isDetailView).toBeTruthy();
    expect(component.selectedService).toEqual(mockService);
  });

  // 4. Kiểm tra logic quay lại View Danh sách
  it('should switch back to listing view when closeDetailView is called', () => {
    // Giả lập đang ở view chi tiết
    component.isDetailView = true;
    
    component.closeDetailView();
    
    expect(component.isDetailView).toBeFalsy();
    expect(component.selectedService).toBeNull();
  });

  // 5. Kiểm tra việc render DOM tương ứng với logic *ngIf
  it('should render the correct view in DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Ban đầu phải có class .listing-view
    expect(compiled.querySelector('.listing-view')).toBeTruthy();
    expect(compiled.querySelector('.detail-view')).toBeFalsy();

    // Chuyển sang detail
    component.openServiceDetail(component.servicesList[0]);
    fixture.detectChanges();

    // Sau khi detect changes, DOM phải thay đổi
    expect(compiled.querySelector('.listing-view')).toBeFalsy();
    expect(compiled.querySelector('.detail-view')).toBeTruthy();
  });
});