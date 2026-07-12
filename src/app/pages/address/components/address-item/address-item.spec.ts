import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressItem } from './address-item';

describe('AddressItem', () => {
  let component: AddressItem;
  let fixture: ComponentFixture<AddressItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
