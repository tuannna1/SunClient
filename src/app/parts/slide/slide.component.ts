import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/JwtResponse";
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {TranslateService} from '../../services/translate.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ProductInfo} from '../../models/productInfo';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, OnDestroy {

  carouselList = [
    {
      bannerImg: "../../../assets/images/bn4.jpg" ,
      title: "WOMEN'S FASHION ",
      description: "50% OFF",
    },
    {
      bannerImg: "../../../assets/images/bn6.jpg",
      title: "ALL BRANDED WOMEN'S BAGS ARE FLAT 30% DISCOUNT",
      description:
        " Visit our shop to see amazing creations from our designers",
    },
    {
      bannerImg: "../../../assets/images/bn8.jpg",
      title: "My fashion Wear",
      description: "Twonderful designs has akenpossession of loremquis nostrum exercitation is simply dummy text ",
    },
  ];

    currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: JwtResponse;
    root = '/';
    Role = Role;

  customOptions: OwlOptions = {
    dots: false,
    responsive: {
      0: { items: 1, margin: 5 },
      430: { items: 2, margin: 5 },
      550: { items: 3, margin: 5 },
      670: { items: 4, margin: 5 },
    },
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    lazyLoad: true,
  }

  productInfo: any;
  page: any;
  title: string;
  private paramSub: Subscription;
  private querySub: Subscription;
    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private productService: ProductService,
                public translate: TranslateService,
    ) {

    }


    ngOnInit() {
        this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (!user || user.role == Role.Customer) {
                this.root = '/';
            } else {
                this.root = '/seller';
            }
        });
      this.querySub = this.route.queryParams.subscribe(() => {
        this.update();
      });
      this.paramSub = this.route.params.subscribe(() => {
        this.update();
      });
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
  getProds(page: number = 1, size: number = 1) {
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

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        // this.name$.unsubscribe();
      this.querySub.unsubscribe();
      this.paramSub.unsubscribe();
    }

    logout() {
        this.userService.logout();
        // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }

}
