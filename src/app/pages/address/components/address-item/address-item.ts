import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address } from '../../address.model';

@Component({
  selector: 'app-address-item',
  imports: [CommonModule],
  templateUrl: './address-item.html',
  styleUrl: './address-item.css',
})
export class AddressItem {
  @Input({ required: true }) address!: Address;
  @Output() edit = new EventEmitter<Address>();
  @Output() delete = new EventEmitter<Address>();

  get maskedPhone(): string {
    const digits = this.address.phone.replace(/\D/g, '');
    return digits.length > 3 ? '*'.repeat(digits.length - 3) + digits.slice(-3) : digits;
  }

  get typeLabel(): string {
    return this.address.type === 'company' ? 'Công ty' : 'Nhà riêng';
  }
}
