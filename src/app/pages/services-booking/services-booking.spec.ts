import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBooking } from './services-booking';

describe('ServicesBooking', () => {
  let component: ServicesBooking;
  let fixture: ComponentFixture<ServicesBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBooking],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
