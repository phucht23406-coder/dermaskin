import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Warranty } from './warranty';

describe('Warranty', () => {
  let component: Warranty;
  let fixture: ComponentFixture<Warranty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Warranty],
    }).compileComponents();

    fixture = TestBed.createComponent(Warranty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
