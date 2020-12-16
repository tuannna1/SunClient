import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductInfo} from "../../models/productInfo";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '../../services/translate.service';

@Component({
    selector: 'app-product-new',
    templateUrl: './product-new.component.html',
    styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit, AfterContentChecked {

    product = new ProductInfo();

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private router: Router,
                public translate: TranslateService) {
    }

    productId: string;
    isEdit = false;
  product1: ProductInfo;

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
  saveProduct() {
    this.productService.createProduct1(this.product)
      .subscribe(data => {

        console.log(data);
        this.router.navigate(['/seller']);
        this.toastr.success('Add Product Success!', 'Reset!');

      }, error => {
        console.log(error);
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
