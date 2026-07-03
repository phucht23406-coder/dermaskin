import { Component } from '@angular/core';

@Component({
  selector: 'app-services-booking',
  imports: [],
  templateUrl: './services-booking.html',
  styleUrl: './services-booking.css',
})
export class ServicesBooking {
  selectTab(event: Event) {
    const btn = event.target as HTMLElement;
    btn.closest('.order-tabs')?.querySelectorAll('.tab-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}