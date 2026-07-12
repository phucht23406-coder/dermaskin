import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressItem } from '../components/address-item/address-item';
import { AddressForm } from '../components/address-form/address-form';
import { Address } from '../address.model';
import { AccountSidebar } from '../../../shared/account-sidebar/account-sidebar';

@Component({
  selector: 'app-address-list',
  imports: [CommonModule, AddressItem, AddressForm, AccountSidebar],
  templateUrl: './address-list.html',
  styleUrl: './address-list.css',
})
export class AddressList implements OnDestroy {
  addresses: Address[] = [
    {
      id: 1,
      name: 'Nguyễn Quốc Khải',
      phone: '0987654457',
      addressLine: 'Tiệm nhà Kiwi CN2, KP Tân An, Phường 11, Quận 3, Thành phố Hồ Chí Minh',
      type: 'home',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Nguyễn Quốc Duy',
      phone: '0987654467',
      addressLine: 'Công ty Pepsi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
      type: 'company',
      isDefault: false,
    },
    {
      id: 3,
      name: 'Nguyễn Quốc Duy',
      phone: '0987654467',
      addressLine: 'Tòa nhà Vinhomes, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
      type: 'home',
      isDefault: false,
    },
  ];

  showForm = false;
  editingAddress: Address | null = null;

  pendingDeleteAddress: Address | null = null;

  toastMessage: string | null = null;
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this.toastTimeoutId);
  }

  openAddForm(): void {
    this.editingAddress = null;
    this.showForm = true;
  }

  openEditForm(address: Address): void {
    this.editingAddress = address;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingAddress = null;
  }

  saveAddress(address: Address): void {
    const isEditing = !!address.id;
    if (isEditing) {
      const index = this.addresses.findIndex((a) => a.id === address.id);
      if (index > -1) {
        this.addresses[index] = address;
      }
    } else {
      this.addresses.push({ ...address, id: Date.now() });
    }
    this.closeForm();
    this.showToast(isEditing ? 'Cập nhật địa chỉ thành công!' : 'Thêm mới địa chỉ thành công!');
  }

  requestDelete(address: Address): void {
    this.pendingDeleteAddress = address;
  }

  cancelDelete(): void {
    this.pendingDeleteAddress = null;
  }

  confirmDelete(): void {
    if (this.pendingDeleteAddress) {
      this.addresses = this.addresses.filter((a) => a.id !== this.pendingDeleteAddress!.id);
    }
    this.pendingDeleteAddress = null;
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = setTimeout(() => {
      this.toastMessage = null;
    }, 2500);
  }
}
