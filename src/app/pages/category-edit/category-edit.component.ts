import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductInfo} from "../../models/productInfo";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, AfterContentChecked {

    category = new Category();

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {
    }

  categoryId: string;
    isEdit = false;

    ngOnInit() {
        this.categoryId = this.route.snapshot.paramMap.get('id');
        if (this.categoryId) {
            this.isEdit = true;
          this.categoryService.getDetailcategoy(this.categoryId).subscribe(data => this.category = data);
        }
    }

    update() {
        this.categoryService.update(this.category).subscribe(prod => {
                if (!prod) throw new Error();
                this.router.navigate(['/categoryList']);
            window.alert('Cập nhật thành công!')
            },
            err => {
            });

    }

    onSubmit() {
        if (this.categoryId) {
            this.update();
        } else {
            // this.add();
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

    ngAfterContentChecked(): void {
        console.log(this.category);
    }
}
