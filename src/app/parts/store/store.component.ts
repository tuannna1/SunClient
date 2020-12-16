import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/JwtResponse";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {TranslateService} from '../../services/translate.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {

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

    constructor(private userService: UserService,
                private router: Router,
                public translate: TranslateService
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

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }

}
