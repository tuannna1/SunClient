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

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.css']
})
export class SaleProductComponent implements OnInit, OnDestroy {
  title: string;
  pagesale: any;
  private paramSub: Subscription;
  private querySub: Subscription;
  loading = false;
  selectedBrand="All";
  status ="all";
  productsList: any;
  productStatus = "getAllproduct";
  searchText
  productInfo: any;

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
      this.update();
    });
    this.paramSub = this.route.params.subscribe(() => {
      this.update();
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('pages')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('pages');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }
  getProds(page: number = 1, size: number = 6) {
    if (this.route.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.pagesale = page;
          this.title = 'Get Whatever You Want!';
        });
    } else { //  /category/:id
      const type = this.route.snapshot.url[1].path;
      this.productService.getCategoryInPage(+type, page, size)
        .subscribe(categoryPage => {
          this.title = categoryPage.category;
          this.pagesale = categoryPage.page;
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



}
