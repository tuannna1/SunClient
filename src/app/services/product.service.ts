import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProductInfo} from '../models/productInfo';
import {apiUrl} from '../../environments/environment';
import {Category} from '../models/Category';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = `${apiUrl}/product`;
    private categoryUrl = `${apiUrl}/category`;
  private baseurl = 'http://localhost:8080/api/delete/product';

    constructor(private http: HttpClient,
                private toastr: ToastrService,) {

    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            )
    }

  createProduct1(product: ProductInfo): Observable<any> {
    return this.http.post<any>(`${apiUrl}/seller/product/new`, product);
  }

    getCategoryInPage(categoryType: number, page: number, size: number): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.http.get(url).pipe(
            // tap(data => console.log(data))
        );
    }

    getDetail(id: String): Observable<ProductInfo> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<ProductInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new ProductInfo());
            })
        );
    }

    update(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
        return this.http.put<ProductInfo>(url, productInfo);
    }

    create(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/new`;
        return this.http.post<ProductInfo>(url, productInfo);
    }

    //
    // delelte(productInfo: ProductInfo): Observable<any> {
    //     const url = `${apiUrl}/seller/product/${productInfo.productId}`;
    //     return this.http.delete(url);
    // }

  deleteProduct1(productId: ProductInfo): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${productId}`);
  }
  addFavouriteProduct(productInfo: ProductInfo) {

    const a: ProductInfo[] = JSON.parse(localStorage.getItem("avf_item")) || [];
    a.push(productInfo);
    this.toastr.success("Adding Product", "Adding Product as Favourite");
    setTimeout(() => {
      localStorage.setItem("avf_item", JSON.stringify(a));
    }, 1500);

  }
  getLocalFavouriteProducts(): ProductInfo[] {
    const productInfo: ProductInfo[] =
      JSON.parse(localStorage.getItem("avf_item")) || [];

    return productInfo;
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
