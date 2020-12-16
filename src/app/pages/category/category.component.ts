import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {OrderStatus} from "../../enum/OrderStatus";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category.service';
import {ProductInfo} from '../../models/productInfo';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

    page: any;
    OrderStatus = OrderStatus;
    currentUser: JwtResponse;
    Role = Role;
    constructor(private httpClient: HttpClient,
                private categoryService: CategoryService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router
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
        this.categoryService.getPage(nextPage, size).subscribe(page => this.page = page, _ => {
            console.log("Get Orde Failed")
        });
    }

  delete(categoryId: Category) {
    this.categoryService.deleteProduct1(categoryId)
      .subscribe(
        data => {
          console.log(data);
          window.alert('xóa thành công!')
          this.router.navigate(['/categoryList']);



        },
        error => console.log(error));

  }

    // cancel(category: Category) {
    //     this.categoryService.cancel(category.categoryId).subscribe(res => {
    //
    //     });
    // }

    // finish(order: Order) {
    //     this.orderService.finish(order.orderId).subscribe(res => {
    //         if (res) {
    //             order.orderStatus = res.orderStatus;
    //         }
    //     })
    // }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
    }

}
