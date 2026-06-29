import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Nhập Header và Footer vào với đường dẫn chính xác
import { Header } from './shared/header/header'; 
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  // Khai báo HeaderComponent và FooterComponent vào mảng imports này
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
})
export class App {
  title = 'dermaskin';
}