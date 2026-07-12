import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSidebar } from './account-sidebar';

describe('AccountSidebar', () => {
  let component: AccountSidebar;
  let fixture: ComponentFixture<AccountSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
