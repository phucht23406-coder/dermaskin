import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-cart-empty',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './cart_empty.html',
  styleUrl: './cart_empty.css'
})
export class CartEmpty {

}
