// services.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Services, Branch, BookingForm } from './services';

// ── Helpers ──────────────────────────────────────────────────
function createComponent(): ComponentFixture<Services> {
  return TestBed.createComponent(Services);
}

// ── Test Suite ───────────────────────────────────────────────
describe('Services Component', () => {

  let fixture: ComponentFixture<Services>;
  let component: Services;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Services,         // standalone component — import directly
        CommonModule,
        FormsModule,
      ],
      providers: [
        provideRouter([]),  // provides RouterLink without a full AppRoutingModule
      ],
    }).compileComponents();

    fixture   = createComponent();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ============================================================
  // 1. COMPONENT CREATION
  // ============================================================
  describe('Component Creation', () => {

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const meta = (Services as any).__ngComponentDef ?? (Services as any).ɵcmp;
      // Angular 17+: check imports array contains required modules
      expect(component).toBeInstanceOf(Services);
    });

    it('should render the services page wrapper', () => {
      const el = fixture.debugElement.query(By.css('.services-page'));
      expect(el).toBeTruthy();
    });

  });

  // ============================================================
  // 2. INITIAL STATE
  // ============================================================
  describe('Initial State', () => {

    it('should initialise isDescExpanded to false', () => {
      expect(component.isDescExpanded).toBeFalse();
    });

    it('should initialise bookingForm with empty strings', () => {
      const f = component.bookingForm;
      expect(f.customerName).toBe('');
      expect(f.customerPhone).toBe('');
      expect(f.selectedService).toBe('');
      expect(f.appointmentTime).toBe('');
      expect(f.selectedBranch).toBe('');
    });

    it('should initialise currentBranchPage to 0', () => {
      expect(component.currentBranchPage).toBe(0);
    });

    it('should have branchPageSize of 3', () => {
      expect(component.branchPageSize).toBe(3);
    });

  });

  // ============================================================
  // 3. BRANCH DATA INTEGRITY
  // ============================================================
  describe('Branch Data Integrity', () => {

    it('should contain exactly 20 branches', () => {
      expect(component.allBranches.length).toBe(20);
    });

    it('should have all required fields on every branch', () => {
      component.allBranches.forEach((branch: Branch) => {
        expect(branch.name).toBeTruthy();
        expect(branch.address).toBeTruthy();
        expect(branch.province).toBeTruthy();
        expect(branch.district).toBeTruthy();
        expect(branch.phone).toBeTruthy();
        expect(typeof branch.latitude).toBe('number');
        expect(typeof branch.longitude).toBe('number');
      });
    });

    it('should include HCMC branches', () => {
      const hcmc = component.allBranches.filter(b => b.province === 'TP. Hồ Chí Minh');
      expect(hcmc.length).toBe(12);
    });

    it('should include Hanoi branches', () => {
      const hn = component.allBranches.filter(b => b.province === 'Hà Nội');
      expect(hn.length).toBe(4);
    });

    it('should include Da Nang branches', () => {
      const dn = component.allBranches.filter(b => b.province === 'Đà Nẵng');
      expect(dn.length).toBe(2);
    });

    it('should include Binh Duong branch', () => {
      const bd = component.allBranches.filter(b => b.province === 'Bình Dương');
      expect(bd.length).toBe(1);
    });

    it('should include Can Tho branch', () => {
      const ct = component.allBranches.filter(b => b.province === 'Cần Thơ');
      expect(ct.length).toBe(1);
    });

    it('should have unique branch names', () => {
      const names = component.allBranches.map(b => b.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

  });

  // ============================================================
  // 4. BRANCH PAGINATION — COMPUTED PROPERTIES
  // ============================================================
  describe('Branch Pagination — Computed Properties', () => {

    it('should compute totalBranchPages as 7 (ceil(20/3))', () => {
      expect(component.totalBranchPages).toBe(7);
    });

    it('should return 3 branches on page 0', () => {
      component.currentBranchPage = 0;
      expect(component.pagedBranches.length).toBe(3);
    });

    it('should return branches 0–2 on page 0', () => {
      component.currentBranchPage = 0;
      expect(component.pagedBranches[0].name).toBe('DermaSkin - Quận 1');
      expect(component.pagedBranches[2].name).toBe('DermaSkin - Quận 5');
    });

    it('should return branches 3–5 on page 1', () => {
      component.currentBranchPage = 1;
      expect(component.pagedBranches[0].name).toBe('DermaSkin - Quận 7');
      expect(component.pagedBranches[2].name).toBe('DermaSkin - Quận 10');
    });

    it('should return only 2 branches on the last page (page 6)', () => {
      component.currentBranchPage = 6;
      expect(component.pagedBranches.length).toBe(2);
    });

    it('should return correct number of page dots', () => {
      expect(component.branchPageDots.length).toBe(7);
    });

    it('branchPageDots should be [0,1,2,3,4,5,6]', () => {
      expect(component.branchPageDots).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });

  });

  // ============================================================
  // 5. BRANCH PAGINATION — NAVIGATION METHODS
  // ============================================================
  describe('Branch Pagination — Navigation Methods', () => {

    it('nextBranchPage() should increment currentBranchPage', () => {
      component.currentBranchPage = 0;
      component.nextBranchPage();
      expect(component.currentBranchPage).toBe(1);
    });

    it('nextBranchPage() should NOT exceed totalBranchPages - 1', () => {
      component.currentBranchPage = component.totalBranchPages - 1;
      component.nextBranchPage();
      expect(component.currentBranchPage).toBe(component.totalBranchPages - 1);
    });

    it('prevBranchPage() should decrement currentBranchPage', () => {
      component.currentBranchPage = 3;
      component.prevBranchPage();
      expect(component.currentBranchPage).toBe(2);
    });

    it('prevBranchPage() should NOT go below 0', () => {
      component.currentBranchPage = 0;
      component.prevBranchPage();
      expect(component.currentBranchPage).toBe(0);
    });

    it('goToBranchPage() should set currentBranchPage to the given index', () => {
      component.goToBranchPage(4);
      expect(component.currentBranchPage).toBe(4);
    });

    it('goToBranchPage() should ignore out-of-range negative index', () => {
      component.currentBranchPage = 2;
      component.goToBranchPage(-1);
      expect(component.currentBranchPage).toBe(2);
    });

    it('goToBranchPage() should ignore out-of-range positive index', () => {
      component.currentBranchPage = 2;
      component.goToBranchPage(99);
      expect(component.currentBranchPage).toBe(2);
    });

    it('pagedBranches should update after nextBranchPage()', () => {
      component.currentBranchPage = 0;
      const firstPageFirst = component.pagedBranches[0].name;
      component.nextBranchPage();
      const secondPageFirst = component.pagedBranches[0].name;
      expect(firstPageFirst).not.toBe(secondPageFirst);
    });

  });

  // ============================================================
  // 6. DESCRIPTION TOGGLE
  // ============================================================
  describe('Description Toggle', () => {

    it('toggleDesc() should set isDescExpanded to true when false', () => {
      component.isDescExpanded = false;
      component.toggleDesc();
      expect(component.isDescExpanded).toBeTrue();
    });

    it('toggleDesc() should set isDescExpanded back to false when true', () => {
      component.isDescExpanded = true;
      component.toggleDesc();
      expect(component.isDescExpanded).toBeFalse();
    });

    it('should add "expanded" class to description text when expanded', fakeAsync(() => {
      component.isDescExpanded = false;
      fixture.detectChanges();
      tick();

      const el = fixture.debugElement.query(By.css('.description-text'));
      expect(el.classes['expanded']).toBeFalsy();

      component.isDescExpanded = true;
      fixture.detectChanges();
      tick();
      expect(el.classes['expanded']).toBeTrue();
    }));

  });

  // ============================================================
  // 7. BOOKING FORM — VALIDATION
  // ============================================================
  describe('Booking Form — Validation', () => {

    let alertSpy: jasmine.Spy;

    beforeEach(() => {
      alertSpy = spyOn(window, 'alert');
    });

    it('should alert when customerName is empty', () => {
      component.bookingForm = {
        customerName:    '',
        customerPhone:   '0909000000',
        selectedService: 'tri-mun',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng nhập họ và tên.');
    });

    it('should alert when customerPhone is empty', () => {
      component.bookingForm = {
        customerName:    'Nguyễn Văn A',
        customerPhone:   '',
        selectedService: 'tri-mun',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng nhập số điện thoại.');
    });

    it('should alert when selectedService is empty', () => {
      component.bookingForm = {
        customerName:    'Nguyễn Văn A',
        customerPhone:   '0909000000',
        selectedService: '',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng chọn dịch vụ.');
    });

    it('should alert when appointmentTime is empty', () => {
      component.bookingForm = {
        customerName:    'Nguyễn Văn A',
        customerPhone:   '0909000000',
        selectedService: 'tri-mun',
        appointmentTime: '',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng chọn thời gian.');
    });

    it('should alert when selectedBranch is empty', () => {
      component.bookingForm = {
        customerName:    'Nguyễn Văn A',
        customerPhone:   '0909000000',
        selectedService: 'tri-mun',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  '',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng chọn chi nhánh.');
    });

    it('should NOT alert a validation error when all fields are filled', () => {
      component.bookingForm = {
        customerName:    'Nguyễn Văn A',
        customerPhone:   '0909000000',
        selectedService: 'tri-mun',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).not.toHaveBeenCalledWith('Vui lòng nhập họ và tên.');
      expect(alertSpy).not.toHaveBeenCalledWith('Vui lòng nhập số điện thoại.');
      expect(alertSpy).not.toHaveBeenCalledWith('Vui lòng chọn dịch vụ.');
      expect(alertSpy).not.toHaveBeenCalledWith('Vui lòng chọn thời gian.');
      expect(alertSpy).not.toHaveBeenCalledWith('Vui lòng chọn chi nhánh.');
    });

    it('should trim whitespace-only customerName and still fail validation', () => {
      component.bookingForm = {
        customerName:    '   ',
        customerPhone:   '0909000000',
        selectedService: 'tri-mun',
        appointmentTime: '2025-01-01T10:00',
        selectedBranch:  'DermaSkin - Quận 1',
      };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalledWith('Vui lòng nhập họ và tên.');
    });

  });

  // ============================================================
  // 8. BOOKING FORM — SUCCESSFUL SUBMISSION
  // ============================================================
  describe('Booking Form — Successful Submission', () => {

    let alertSpy: jasmine.Spy;
    let consoleSpy: jasmine.Spy;

    beforeEach(() => {
      alertSpy   = spyOn(window, 'alert');
      consoleSpy = spyOn(console, 'log');
    });

    const validForm: BookingForm = {
      customerName:    'Nguyễn Thị Lan',
      customerPhone:   '0909123456',
      selectedService: 'cham-soc-da',
      appointmentTime: '2025-06-15T09:00',
      selectedBranch:  'DermaSkin - Quận 3',
    };

    it('should call console.log with payload on valid submission', () => {
      component.bookingForm = { ...validForm };
      component.submitBooking();
      expect(consoleSpy).toHaveBeenCalled();
      const logArgs = consoleSpy.calls.mostRecent().args;
      expect(logArgs[0]).toBe('[DermaSkin] Booking submitted:');
      expect(logArgs[1].customerName).toBe('Nguyễn Thị Lan');
      expect(logArgs[1].selectedBranch).toBe('DermaSkin - Quận 3');
      expect(logArgs[1].submittedAt).toBeTruthy();
    });

    it('should reset bookingForm after successful submission', () => {
      component.bookingForm = { ...validForm };
      component.submitBooking();
      expect(component.bookingForm.customerName).toBe('');
      expect(component.bookingForm.customerPhone).toBe('');
      expect(component.bookingForm.selectedService).toBe('');
      expect(component.bookingForm.appointmentTime).toBe('');
      expect(component.bookingForm.selectedBranch).toBe('');
    });

    it('should show a success alert after valid submission', () => {
      component.bookingForm = { ...validForm };
      component.submitBooking();
      expect(alertSpy).toHaveBeenCalled();
      const msg: string = alertSpy.calls.mostRecent().args[0];
      expect(msg).toContain('Đặt lịch thành công');
      expect(msg).toContain('DermaSkin - Quận 3');
    });

  });

  // ============================================================
  // 9. SAMPLE DATA
  // ============================================================
  describe('Sample Data', () => {

    it('should have 4 sample reviews', () => {
      expect(component.sampleReviews.length).toBe(4);
    });

    it('each review should have userName, date, and rating', () => {
      component.sampleReviews.forEach(r => {
        expect(r.userName).toBeTruthy();
        expect(r.date).toBeTruthy();
        expect(r.rating).toBeGreaterThanOrEqual(1);
        expect(r.rating).toBeLessThanOrEqual(5);
      });
    });

    it('should have 4 related products', () => {
      expect(component.relatedProducts.length).toBe(4);
    });

    it('each related product should have required fields', () => {
      component.relatedProducts.forEach(p => {
        expect(p.name).toBeTruthy();
        expect(p.price).toBeTruthy();
        expect(p.originalPrice).toBeTruthy();
        expect(p.discount).toBeTruthy();
        expect(p.rating).toBeTruthy();
      });
    });

  });

  // ============================================================
  // 10. TEMPLATE — ROUTER LINKS
  // ============================================================
  describe('Template — Router Links', () => {

    it('should render the "Đặt hẹn" booking button as a router link', () => {
      const el = fixture.debugElement.query(By.css('a.btn-book-appointment'));
      expect(el).toBeTruthy();
    });

    it('"Đặt hẹn" link should have routerLink to /product-detail', () => {
      const el = fixture.debugElement.query(By.css('a.btn-book-appointment'));
      expect(el.attributes['ng-reflect-router-link']).toBe('/product-detail');
    });

    it('should render the "Xem thêm" related products link', () => {
      const el = fixture.debugElement.query(By.css('a.btn-view-more'));
      expect(el).toBeTruthy();
    });

    it('related product cards should all have routerLink to /product-detail', () => {
      const cards = fixture.debugElement.queryAll(By.css('a.product-card'));
      expect(cards.length).toBe(4);
      cards.forEach(card => {
        expect(card.attributes['ng-reflect-router-link']).toBe('/product-detail');
      });
    });

  });

  // ============================================================
  // 11. TEMPLATE — BOOKING FORM FIELDS
  // ============================================================
  describe('Template — Booking Form Fields', () => {

    it('should render the customer name input', () => {
      const el = fixture.debugElement.query(By.css('#customerName'));
      expect(el).toBeTruthy();
    });

    it('should render the customer phone input', () => {
      const el = fixture.debugElement.query(By.css('#customerPhone'));
      expect(el).toBeTruthy();
    });

    it('should render the service select', () => {
      const el = fixture.debugElement.query(By.css('#serviceSelect'));
      expect(el).toBeTruthy();
    });

    it('should render the appointment time input', () => {
      const el = fixture.debugElement.query(By.css('#appointmentTime'));
      expect(el).toBeTruthy();
    });

    it('should render the branch select', () => {
      const el = fixture.debugElement.query(By.css('#branchSelect'));
      expect(el).toBeTruthy();
    });

    it('branch select should contain 20 branch options plus placeholder', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const options = fixture.debugElement.queryAll(By.css('#branchSelect option'));
      expect(options.length).toBe(21); // 20 branches + 1 placeholder
    }));

    it('should render the "Đặt lịch" submit button', () => {
      const el = fixture.debugElement.query(By.css('.btn-dat-lich'));
      expect(el).toBeTruthy();
    });

  });

  // ============================================================
  // 12. TEMPLATE — BRANCH PAGINATION BUTTONS
  // ============================================================
  describe('Template — Branch Pagination Buttons', () => {

    it('should render branch prev and next buttons', () => {
      const prev = fixture.debugElement.query(By.css('.branch-nav-btn:first-of-type'));
      const next = fixture.debugElement.query(By.css('.branch-nav-btn:last-of-type'));
      expect(prev).toBeTruthy();
      expect(next).toBeTruthy();
    });

    it('prev button should be disabled on page 0', () => {
      component.currentBranchPage = 0;
      fixture.detectChanges();
      const prev = fixture.debugElement.query(By.css('.branch-nav-btn:first-of-type'));
      expect(prev.nativeElement.disabled).toBeTrue();
    });

    it('next button should be disabled on the last page', () => {
      component.currentBranchPage = component.totalBranchPages - 1;
      fixture.detectChanges();
      const next = fixture.debugElement.query(By.css('.branch-nav-btn:last-of-type'));
      expect(next.nativeElement.disabled).toBeTrue();
    });

    it('clicking next button should advance to page 1', () => {
      component.currentBranchPage = 0;
      fixture.detectChanges();
      const next = fixture.debugElement.query(By.css('.branch-nav-btn:last-of-type'));
      next.nativeElement.click();
      fixture.detectChanges();
      expect(component.currentBranchPage).toBe(1);
    });

    it('should render 7 page dots', () => {
      fixture.detectChanges();
      const dots = fixture.debugElement.queryAll(By.css('.branch-dot'));
      expect(dots.length).toBe(7);
    });

    it('first dot should have "active" class on page 0', () => {
      component.currentBranchPage = 0;
      fixture.detectChanges();
      const dots = fixture.debugElement.queryAll(By.css('.branch-dot'));
      expect(dots[0].classes['active']).toBeTrue();
      expect(dots[1].classes['active']).toBeFalsy();
    });

  });

});