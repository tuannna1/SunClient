import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Order} from "../models/Order";
import {apiUrl} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderUrl = `${apiUrl}/order`;
    private orderUrl1 = `${apiUrl}/order/chart`;
  private orderUrlFinish= `${apiUrl}/order/status1`;
  private orderUrlApproved= `${apiUrl}/order/status3`;
  private orderUrlCancel= `${apiUrl}/order/status2`;

    constructor(private http: HttpClient) {
    }

    getPage(page = 1, size = 10): Observable<any> {
        return this.http.get(`${this.orderUrl}?page=${page}&size=${size}`).pipe();
    }

  getPageoder1(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrlFinish}?page=${page}&size=${size}`).pipe();
  }
    getPageoder2(page = 1, size = 10): Observable<any> {
      return this.http.get(`${this.orderUrlCancel}?page=${page}&size=${size}`).pipe();
    }
  getPageoder3(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrlApproved}?page=${page}&size=${size}`).pipe();
  }

  getPage1(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrl1}?page=${page}&size=${size}`).pipe();
  }

    show(id): Observable<Order> {
        return this.http.get<Order>(`${this.orderUrl}/${id}`).pipe(
            catchError(_ => of(null))
        );
    }

    cancel(id): Observable<Order> {
        return this.http.patch<Order>(`${this.orderUrl}/cancel/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }

  approved(id): Observable<Order> {
    return this.http.patch<Order>(`${this.orderUrl}/approved/${id}`, null).pipe(
      catchError(_ => of(null))
    );
  }

    finish(id): Observable<Order> {
        return this.http.patch<Order>(`${this.orderUrl}/finish/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }
}
