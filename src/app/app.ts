import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Account } from './pages/account/account';
// import { AiConsult } from './pages/ai-consult/ai-consult';
// import { Orders } from './pages/orders/orders';
// import { Wishlist } from './pages/wishlist/wishlist';
// import { Voucher } from './pages/voucher/voucher';
// import { ServicesBooking } from './pages/services-booking/services-booking';
import { Logout } from './pages/logout/logout';



import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('dermaskin');
}

