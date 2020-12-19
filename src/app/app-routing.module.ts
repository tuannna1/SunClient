import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardComponent} from './pages/card/card.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {CartComponent} from './pages/cart/cart.component';
import {AuthGuard} from "./_guards/auth.guard";
import {OrderComponent} from "./pages/order/order.component";
import {OrderDetailComponent} from "./pages/order-detail/order-detail.component";
import {ProductListComponent} from "./pages/product-list/product.list.component";
import {UserDetailComponent} from "./pages/user-edit/user-detail.component";
import {ProductEditComponent} from "./pages/product-edit/product-edit.component";
import {Role} from "./enum/Role";
import {CategoryComponent} from './pages/category/category.component';
import {ProductNewComponent} from './pages/product-new/product-new.component';
import {CategoryNewComponent} from './pages/category-new/category-new.component';
import {CategoryEditComponent} from './pages/category-edit/category-edit.component';
import {SlideComponent} from './parts/slide/slide.component';
import {SizeComponent} from './parts/size/size.component';
import {ReturnPolicyComponent} from './parts/return-policy/return-policy.component';
import {WarrantyComponent} from './parts/warranty/warranty.component';
import {ShippingComponent} from './parts/shipping/shipping.component';
import {StoreComponent} from './parts/store/store.component';
import {AboutComponent} from './parts/about/about.component';
import {ContactComponent} from './parts/contact/contact.component';
import {UserListComponent} from './pages/user-list/user.list.component';
import {UserNewComponent} from './pages/user-new/user-new.component';
import {ChartComponent} from './pages/chart/chart.component';

const routes: Routes = [
    {path: '', redirectTo: '/slide', pathMatch: 'full'},
    {path: 'product/:id', component: DetailComponent},
    {path: 'category/:id', component: CardComponent},
    {path: 'product', component: CardComponent},
    {path: 'category', component: CardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'register', component: SignupComponent},
    {path: 'cart', component: CartComponent},
    {path: 'success', component: SignupComponent},
    {path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
    {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
    {path: 'seller', redirectTo: 'seller/product', pathMatch: 'full'},
  {path: 'slide', component: SlideComponent},
  {path: 'size', component: SizeComponent},
  {path: 'return', component: ReturnPolicyComponent},
  {path: 'warranty', component: WarrantyComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'store', component: StoreComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
    {
        path: 'seller/product',
        component: ProductListComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Manager, Role.Employee]}
    },

  {
    path: 'productList',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager, Role.Employee]}
  },
    {
        path: 'profile',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'seller/product/:id/edit',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Manager, Role.Employee]}
    },
    {
        path: 'seller/product/new',
        component: ProductNewComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Employee,Role.Manager]}
    },
  {
    path: 'categoryList',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager, Role.Employee]}
  },

  {
    path: 'seller/category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager, Role.Employee]}
  },
  {
    path: 'seller/category/:id/edit',
    component: CategoryEditComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager, Role.Employee]}
  },
  {
    path: 'seller/category/new',
    component: CategoryNewComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },
  {path: 'userList',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager, Role.Employee]}
  },
  {path: 'user/new',
    component: UserNewComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager]}
  },
  {path: 'chart',
    component: ChartComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Manager]}
  },

];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)//{onSameUrlNavigation: 'reload'}
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
