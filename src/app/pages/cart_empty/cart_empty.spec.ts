import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEmpty } from './cart_empty';

describe('CartEmpty', () => {
  let component: CartEmpty;
  let fixture: ComponentFixture<CartEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(CartEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
