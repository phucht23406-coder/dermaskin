import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Services } from './pages/services/services';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Profile } from './pages/profile/profile';
import { Blog } from './pages/blog/blog';
import { PoliciesComponent } from './pages/policies/policies';
import { AiConsult } from './pages/ai-consult/ai-consult';
import { Stores } from './pages/stores/stores';
import { CartEmpty } from './pages/cart_empty/cart_empty';
import { WarrantyComponent } from './pages/warranty/warranty';
import { Account } from './pages/account/account';
import { Orders } from './pages/orders/orders';
import { Wishlist } from './pages/wishlist/wishlist';
import { Voucher } from './pages/voucher/voucher';
import { ServicesBooking } from './pages/services-booking/services-booking';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'cart_empty', component: CartEmpty },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'product-detail', component: ProductDetail },
  { path: 'services', component: Services },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'profile', component: Profile },
  { path: 'blog', component: Blog },
  { path: 'policies', component: PoliciesComponent, },
  { path: 'ai-consult', component: AiConsult },
  { path: 'stores', component: Stores },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'account', component: Account },
  { path: 'orders', component: Orders },
  { path: 'wishlist', component: Wishlist },
  { path: 'voucher', component: Voucher },
  { path: 'services-booking', component: ServicesBooking },
  { path: '**', redirectTo: '' }
];


