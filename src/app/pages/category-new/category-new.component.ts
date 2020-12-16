import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductInfo} from "../../models/productInfo";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-category-new',
    templateUrl: './category-new.component.html',
    styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit, AfterContentChecked {

    category = new Category();

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    categoryId: string;
    isEdit = false;
  category1: Category;

    ngOnInit() {
        this.categoryId = this.route.snapshot.paramMap.get('id');
        if (this.categoryId) {
            this.isEdit = true;

        }

    }

    update() {
        this.categoryService.update(this.category).subscribe(prod => {
                if (!prod) throw new Error();
                this.router.navigate(['/seller']);
            },
            err => {
            });

    }

    onSubmit() {
        if (this.categoryId) {
            this.update();
        } else {
            this.add();
        }
    }

    add() {
        this.categoryService.create(this.category).subscribe(prod => {
                if (!prod) throw new Error;
                this.router.navigate(['/']);
            },
            e => {
            });
    }
  save() {
    this.categoryService.createProduct1(this.category)
      .subscribe(data => {

        console.log(data);
        window.alert('Thêm mới thành công!')
        this.router.navigate(['/categoryList']);
      }, error => {
        console.log(error);
      });
  }

    ngAfterContentChecked(): void {
        console.log(this.category);
    }
}
