import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryType} from "../../enum/CategoryType";
import {ProductStatus} from "../../enum/ProductStatus";
import {ProductInfo} from "../../models/productInfo";
import {Role} from "../../enum/Role";
import {Category} from '../../models/Category';
import {ProductInOrder} from '../../models/ProductInOrder';
import {User} from '../../models/User';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-product.list',
    templateUrl: './user.list.component.html',
    styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

    constructor(private userService: UserService,
                private router: Router,
                private toastr: ToastrService,
                private route: ActivatedRoute) {
    }

    Role = Role;
    currentUser: JwtResponse;
    page: any;
    CategoryType = CategoryType;
    ProductStatus = ProductStatus;
    private querySub: Subscription;
    user: User;

    ngOnInit() {
        this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
        });
    }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
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



    getProds(page: number = 1, size: number = 5) {
        this.userService.getAllInPage(+page, +size)
            .subscribe(page => {
                this.page = page;
            });

    }

    deleteUser(id: User) {
    this.userService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/userList']);
          this.toastr.success('Delete User Success!', 'Reset!');
        },
        error => console.log(error));

  }
}
