import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/JwtResponse";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {TranslateService} from '../../services/translate.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ProductInfo} from '../../models/productInfo';

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

    constructor(private userService: UserService,
                private router: Router,
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
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        // this.name$.unsubscribe();
    }

    logout() {
        this.userService.logout();
        // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }

}
