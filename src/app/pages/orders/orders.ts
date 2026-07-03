import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  selectTab(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.order-tabs')?.querySelectorAll('.tab-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}