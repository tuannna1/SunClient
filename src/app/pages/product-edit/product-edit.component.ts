import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductInfo} from "../../models/productInfo";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from '../../services/translate.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {

    product = new ProductInfo();

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router,
                public translate: TranslateService) {
    }

    productId: string;
    isEdit = false;

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        if (this.productId) {
            this.isEdit = true;
            this.productService.getDetail(this.productId).subscribe(prod => this.product = prod);
        }

    }

    update() {
        this.productService.update(this.product).subscribe(prod => {
                if (!prod) throw new Error();
                this.router.navigate(['/seller']);
            window.alert('Cập nhật thành công!')
            },
            err => {
            });

    }

    onSubmit() {
        if (this.productId) {
            this.update();
        } else {
            this.add();
        }
    }

    add() {
        this.productService.create(this.product).subscribe(prod => {
                if (!prod) throw new Error;
                this.router.navigate(['/']);

            },
            e => {
            });
    }

    ngAfterContentChecked(): void {
        console.log(this.product);
    }

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
}
