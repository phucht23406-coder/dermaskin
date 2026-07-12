import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AccountSidebarItem =
  | 'profile'
  | 'orders'
  | 'wishlist'
  | 'voucher'
  | 'services'
  | 'address'
  | 'logout';

@Component({
  selector: 'app-account-sidebar',
  imports: [CommonModule],
  templateUrl: './account-sidebar.html',
  styleUrl: './account-sidebar.css',
})
export class AccountSidebar {
  @Input() active: AccountSidebarItem | null = null;
  @Input() userName = 'Khải';
}
