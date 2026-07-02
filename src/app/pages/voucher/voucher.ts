import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voucher',
  imports: [CommonModule],
  templateUrl: './voucher.html',
  styleUrl: './voucher.css',
})
export class Voucher {
  vouchers: any[] = [];
}