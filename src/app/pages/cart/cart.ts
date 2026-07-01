import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

}
