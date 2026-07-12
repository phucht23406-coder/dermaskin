import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Address } from '../../address.model';

interface DistrictOption {
  value: string;
  label: string;
  wards: string[];
}

interface AddressFormModel {
  phone: string;
  name: string;
  districtValue: string;
  ward: string;
  addressDetail: string;
  type: 'home' | 'company';
  isDefault: boolean;
}

@Component({
  selector: 'app-address-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm implements OnChanges {
  @Input() address: Address | null = null;
  @Output() save = new EventEmitter<Address>();
  @Output() close = new EventEmitter<void>();

  readonly districtOptions: DistrictOption[] = [
    {
      value: 'q1-hcm',
      label: 'Quận 1, Thành phố Hồ Chí Minh',
      wards: ['Phường Bến Thành', 'Phường Bến Nghé', 'Phường Nguyễn Thái Bình'],
    },
    {
      value: 'q3-hcm',
      label: 'Quận 3, Thành phố Hồ Chí Minh',
      wards: ['Phường 9', 'Phường 11', 'Phường 12'],
    },
    {
      value: 'binhthanh-hcm',
      label: 'Quận Bình Thạnh, Thành phố Hồ Chí Minh',
      wards: ['Phường 13', 'Phường 17', 'Phường 24'],
    },
    {
      value: 'thuduc-hcm',
      label: 'Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
      wards: ['Phường Linh Trung', 'Phường Bình Thọ', 'Phường Hiệp Bình Chánh'],
    },
    {
      value: 'hoankiem-hn',
      label: 'Quận Hoàn Kiếm, Thành phố Hà Nội',
      wards: ['Phường Hàng Bạc', 'Phường Cửa Nam', 'Phường Trần Hưng Đạo'],
    },
  ];

  model: AddressFormModel = this.emptyModel();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address']) {
      this.model = this.address ? this.toModel(this.address) : this.emptyModel();
    }
  }

  get isEditing(): boolean {
    return !!this.address;
  }

  get wardOptions(): string[] {
    return this.districtOptions.find((d) => d.value === this.model.districtValue)?.wards ?? [];
  }

  onDistrictChange(value: string): void {
    this.model.districtValue = value;
    this.model.ward = '';
  }

  onSubmit(): void {
    const district = this.districtOptions.find((d) => d.value === this.model.districtValue);
    const addressLine = [this.model.addressDetail, this.model.ward, district?.label]
      .filter(Boolean)
      .join(', ');

    this.save.emit({
      id: this.address?.id ?? 0,
      name: this.model.name,
      phone: this.model.phone,
      addressLine,
      type: this.model.type,
      isDefault: this.model.isDefault,
    });
  }

  private emptyModel(): AddressFormModel {
    return {
      phone: '',
      name: '',
      districtValue: '',
      ward: '',
      addressDetail: '',
      type: 'home',
      isDefault: false,
    };
  }

  private toModel(address: Address): AddressFormModel {
    return {
      phone: address.phone,
      name: address.name,
      districtValue: '',
      ward: '',
      addressDetail: address.addressLine,
      type: address.type,
      isDefault: address.isDefault,
    };
  }
}
