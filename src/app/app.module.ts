import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from './parts/navigation/navigation.component';
import {CardComponent} from './pages/card/card.component';
import {PaginationComponent} from './parts/pagination/pagination.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CartComponent} from './pages/cart/cart.component';
import {CookieService} from "ngx-cookie-service";
import {ErrorInterceptor} from "./_interceptors/error-interceptor.service";
import {JwtInterceptor} from "./_interceptors/jwt-interceptor.service";
import {OrderComponent} from './pages/order/order.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {ProductListComponent} from './pages/product-list/product.list.component';
import {UserDetailComponent} from './pages/user-edit/user-detail.component';
import {ProductEditComponent} from './pages/product-edit/product-edit.component';
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
import {FooterComponent} from './parts/footer/footer.component';
import {UserListComponent} from './pages/user-list/user.list.component';
import {UserNewComponent} from './pages/user-new/user-new.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TranslateService} from './services/translate.service';
import {TranslatePipe} from './pipes/translate.pipe';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ChartComponent} from './pages/chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {ImageZoomModule} from 'angular2-image-zoom';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {BestProductComponent} from './pages/best-product/best-product.component';
import {NewProductComponent} from './pages/new-product/new-product.component';
import {SaleProductComponent} from './pages/sale-product/sale-product.component';





export function setupTranslateFactory(service: TranslateService) {
  return () => service.use("en");
}

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        CardComponent,
        PaginationComponent,
        LoginComponent,
        SignupComponent,
        DetailComponent,
        CartComponent,
        OrderComponent,
        OrderDetailComponent,
        ProductListComponent,
        UserDetailComponent,
        ProductEditComponent,
      CategoryComponent,
      ProductNewComponent,
      CategoryNewComponent,
      CategoryEditComponent,
      UserListComponent,
      UserNewComponent,
      SlideComponent,
      SizeComponent,
      ReturnPolicyComponent,
      WarrantyComponent,
      ShippingComponent,
      StoreComponent,
      AboutComponent,
      ContactComponent,
      FooterComponent,
      TranslatePipe,
      ChartComponent,
      BestProductComponent,
      NewProductComponent,
      SaleProductComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        ChartsModule,
        NgxSpinnerModule,
        ImageZoomModule,
         CarouselModule,

      ToastrModule.forRoot(),

      Ng2SearchPipeModule

    ],
    providers: [CookieService,TranslateService,
      {provide: APP_INITIALIZER, useFactory: setupTranslateFactory, deps: [TranslateService], multi: true,},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
