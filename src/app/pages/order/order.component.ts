import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {OrderStatus} from "../../enum/OrderStatus";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../enum/Role";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

    page: any;

    OrderStatus = OrderStatus;
    currentUser: JwtResponse;
    Role = Role;
    lol =false;
    constructor(private httpClient: HttpClient,
                private orderService: OrderService,
                private userService: UserService,
                private route: ActivatedRoute
    ) {
    }

    querySub: Subscription;

    ngOnInit() {
        this.currentUser = this.userService.currentUserValue;
         this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
         });

    }

    update() {
        let nextPage = 1;
        let size = 10;
        if (this.route.snapshot.queryParamMap.get('page')) {
            nextPage = +this.route.snapshot.queryParamMap.get('page');

            size = +this.route.snapshot.queryParamMap.get('size');

        }
        this.orderService.getPage(nextPage, size).subscribe(page => this.page = page, _ => {
            console.log("Get Orde Failed")
        });
    }
  pageoder0() {
    let nextPage = 1;
    let size = 10;


    if (this.route.snapshot.queryParamMap.get('page1')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page1');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder0(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }

  pageoder1() {
    let nextPage = 1;
    let size = 10;


    if (this.route.snapshot.queryParamMap.get('page1')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page1');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder1(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }

  pageoder2() {
    let nextPage = 1;
    let size = 10;

    if (this.route.snapshot.queryParamMap.get('page2')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page2');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder2(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  pageoder3() {
    let nextPage = 1;
    let size = 10;

    if (this.route.snapshot.queryParamMap.get('page3')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page3');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder3(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }


    cancel(order: Order) {
        this.orderService.cancel(order.orderId).subscribe(res => {
            if (res) {
                order.orderStatus = res.orderStatus;
            }
        });
    }
  approved(order: Order) {
    this.orderService.approved(order.orderId).subscribe(res => {
      if (res) {
        order.orderStatus = res.orderStatus;
      }
    })
  }

    finish(order: Order) {
        this.orderService.finish(order.orderId).subscribe(res => {
            if (res) {
                order.orderStatus = res.orderStatus;
            }
        })
    }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
    }


}
