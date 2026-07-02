import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Account } from './pages/account/account';
// import { AiConsult } from './pages/ai-consult/ai-consult';
// import { Orders } from './pages/orders/orders';
// import { Wishlist } from './pages/wishlist/wishlist';
// import { Voucher } from './pages/voucher/voucher';
// import { ServicesBooking } from './pages/services-booking/services-booking';
import { Logout } from './pages/logout/logout';



@Component({
  selector: 'app-root',
//   imports: [RouterOutlet, Account],
//   imports: [RouterOutlet, AiConsult],
//   imports: [RouterOutlet, Orders],
//   imports: [RouterOutlet, Wishlist],
//   imports: [RouterOutlet, Voucher],
//   imports: [RouterOutlet, ServicesBooking],
  imports: [RouterOutlet, Logout],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dermaskin');
}

