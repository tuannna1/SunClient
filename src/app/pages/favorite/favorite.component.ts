import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subject, Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {JwtResponse} from '../../response/JwtResponse';
import {ProductInOrder} from '../../models/ProductInOrder';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../enum/Role';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '../../services/translate.service';
import {ProductInfo} from '../../models/productInfo';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

    constructor(private cartService: CartService,
                private userService: UserService,
                private toastr: ToastrService,
                private productService: ProductService,
                private router: Router,
                public translate: TranslateService
    ) {
        this.userSubscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
    }
     page: any;
     productInfo: ProductInfo[];
     currentUser: JwtResponse;
     userSubscription: Subscription;



    ngOnInit() {
      this.getFavouriteProduct();
    }

  getFavouriteProduct() {
    this.productInfo = this.productService.getLocalFavouriteProducts();
  }



  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
}

