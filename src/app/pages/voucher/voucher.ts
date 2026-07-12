import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSidebar } from '../../shared/account-sidebar/account-sidebar';

export interface VoucherItem {
  id: number;
  title: string;
  discount: string;
  minOrder: string;
  expiryDate: string;
  expiryTime: string;
  logo: string;
  logoAlt: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-voucher',
  imports: [CommonModule, AccountSidebar],
  templateUrl: './voucher.html',
  styleUrl: './voucher.css',
})
export class Voucher {
  vouchers: VoucherItem[] = [
    {
      id: 1,
      title: 'DERMASKIN giảm 30% cho bạn mới!',
      discount: 'Giảm 30%',
      minOrder: 'Đơn tối thiểu 200k',
      expiryDate: '30/06/2026',
      expiryTime: '23:59',
      logo: 'images/voucher/brands/logo-dermaskin.png',
      logoAlt: 'Logo Dermaskin',
      isNew: true,
    },
    {
      id: 2,
      title: 'DERMASKIN tặng bạn mã giảm 10%!',
      discount: 'Giảm 10%',
      minOrder: 'Đơn tối thiểu 200k',
      expiryDate: '30/12/2026',
      expiryTime: '23:59',
      logo: 'images/voucher/brands/logo-dermaskin.png',
      logoAlt: 'Logo Dermaskin',
    },
    {
      id: 3,
      title: 'FLUFFY liên kết với SPX Express!',
      discount: 'Giảm 30%',
      minOrder: 'Đơn tối thiểu 200k',
      expiryDate: '30/06/2026',
      expiryTime: '23:59',
      logo: 'images/voucher/brands/logo-spx.png',
      logoAlt: 'Logo SPX Express',
    },
    {
      id: 4,
      title: 'FLUFFY liên kết với SPX Express!',
      discount: 'Giảm 30%',
      minOrder: 'Đơn tối thiểu 200k',
      expiryDate: '30/06/2026',
      expiryTime: '23:59',
      logo: 'images/voucher/brands/logo-mb.png',
      logoAlt: 'Logo MB',
    },
  ];
}
