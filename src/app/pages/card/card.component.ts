import {Component, OnDestroy, OnInit} from '@angular/core';
// import {prod, products} from '../shared/mockData';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {TranslateService} from '../../services/translate.service';
import {ProductInOrder} from '../../models/ProductInOrder';
import {CartService} from '../../services/cart.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../services/user.service';
import {ProductInfo} from '../../models/productInfo';
import {ToastrService} from 'ngx-toastr';
import {ProductStatus} from '../../enum/ProductStatus';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  title: string;
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;
  loading = false;
  status ="all";
  productStatus = "getAllproduct";
  productId = "getAllproduct";
  searchText
  productInfo: any;
  count: number;
  ProductStatus = ProductStatus;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              public translate: TranslateService,
              private cartService: CartService,
              private toastr: ToastrService,
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router,

              ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update()
    });
    this.paramSub = this.route.params.subscribe(() => {
this.update()
    });

  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }
  under25() {
    let nextPage = 1;
    let size = 12;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.productService.getunder25(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  from25to50() {
    let nextPage = 1;
    let size = 12;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.productService.getfrom25to50(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  from50to100() {
    let nextPage = 1;
    let size = 12;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.productService.getfrom50to100(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  from100to200() {
    let nextPage = 1;
    let size = 12;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.productService.getfrom100to200(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  above200() {
    let nextPage = 1;
    let size = 12;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.productService.getabove200(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  getProds(page: number = 1, size: number = 12) {
    if (this.route.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.page = page;
          this.title = 'Get Whatever You Want!';
        });
    } else { //  /category/:id
      const type = this.route.snapshot.url[1].path;
      this.productService.getCategoryInPage(+type, page, size)
        .subscribe(categoryPage => {
          this.title = categoryPage.category;
          this.page = categoryPage.page;
        });
    }
  }

  addToCart(productInfo: any) {
    this.cartService
        .addItem(new ProductInOrder(productInfo))
      .subscribe(
        res => {
          if (!res) {
            console.log('Add Cart failed' + res);
            throw new Error();
          }
          this.toastr.success('Add cart success!', 'Wow checkout now!');
          this.router.navigateByUrl('/cart');
        },
        _ => console.log('Add Cart Failed')
      );
  }
  addToFavorite(productInfo: any) {
    this.productService.addFavouriteProduct(productInfo);
  }

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
ShowProduct(productPrice: number) {
    const getAll = this.productStatus === 'getAllproduct';
    const getunder25 = this.productStatus === 'under25' && 25 >= productPrice;
    const get25To50 = this.productStatus === '2550' &&  50 > productPrice && productPrice >= 25;
    const get50To100 = this.productStatus === '50100' &&  100 > productPrice && productPrice >= 50;
    const get100To200 = this.productStatus === '100200' &&  200 > productPrice && productPrice >= 100;
    const get200above = this.productStatus === '200above' && productPrice >= 200;
    return getAll || getunder25 || get25To50 || get50To100 || get100To200 || get200above ;
  }

  validateCount() {
    console.log('Validate');
    const max = this.productInfo.productStock;
    if (this.count > max) {
      this.count = max;
    } else if (this.count < 1) {
      this.count = 0;
    }
  }

}
