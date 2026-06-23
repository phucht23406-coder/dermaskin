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
import { Policies } from './pages/policies/policies';
import { AiConsult } from './pages/ai-consult/ai-consult';
import { Stores } from './pages/stores/stores';
import { Warranty } from './pages/warranty/warranty';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'services', component: Services },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'profile', component: Profile },
  { path: 'blog', component: Blog },
  { path: 'policies', component: Policies },
  { path: 'ai-consult', component: AiConsult },
  { path: 'stores', component: Stores },
  { path: 'warranty', component: Warranty },
  { path: '**', redirectTo: '' } 
];