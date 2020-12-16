import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Order} from "../models/Order";
import {apiUrl} from "../../environments/environment";
import {Category} from '../models/Category';
import {ProductInfo} from '../models/productInfo';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categoryUrl = `${apiUrl}/categoryList`;
  private baseurl = 'http://localhost:8080/api/delete/category';
  private baseurl1 = 'http://localhost:8080/api/categoryy';

    constructor(private http: HttpClient) {
    }

    getPage(page = 1, size = 10): Observable<any> {
        return this.http.get(`${this.categoryUrl}?page=${page}&size=${size}`).pipe();
    }

  update(category: Category): Observable<Category> {
    const url = `${apiUrl}/seller/category/${category.categoryId}/edit`;
    return this.http.put<Category>(url, category);
  }

  create(category: Category): Observable<Category> {
    const url = `${apiUrl}/seller/category/new`;
    return this.http.post<Category>(url, category);
  }
  deleteProduct1(categoryId: Category): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${categoryId}`);
  }

  createProduct1(category: Category): Observable<any> {
    return this.http.post<any>(`${apiUrl}/seller/category/new`, category);
  }

  getDetailcategoy(id: string): Observable<Category> {
    const url = `${this.baseurl1}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Category());
      })
    );
  }

}
