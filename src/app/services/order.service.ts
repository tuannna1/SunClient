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
    private orderUrlPending = `${apiUrl}/order/status0`;
  private orderUrlFinish = `${apiUrl}/order/status1`;
  private orderUrlApproved = `${apiUrl}/order/status3`;
  private orderUrlCancel = `${apiUrl}/order/status2`;
  private orderSumStatus0 = `${apiUrl}/order/getSumStatus0`;
  private orderSumStatus1 = `${apiUrl}/order/getSumStatus1`;
  private orderSumStatus2 = `${apiUrl}/order/getSumStatus2`;
  private orderSumStatus3 = `${apiUrl}/order/getSumStatus3`;
  private orderSumAll = `${apiUrl}/order/getSumAll`;
  private orderCountStatus0 = `${apiUrl}/order/getCountStatus0`;
  private orderCountStatus1 = `${apiUrl}/order/getCountStatus1`;
  private orderCountStatus2 = `${apiUrl}/order/getCountStatus2`;
  private orderCountStatus3 = `${apiUrl}/order/getCountStatus3`;
  private orderCountAll = `${apiUrl}/order/getCountAll`;


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
  getPageoder0(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrlPending}?page=${page}&size=${size}`).pipe();
  }
  getPage1(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrl1}?page=${page}&size=${size}`).pipe();
  }
  getSumStatus0(): Observable<any> {
    return this.http.get(`${this.orderSumStatus0}`).pipe();
  }
  getSumStatus1(): Observable<any> {
    return this.http.get(`${this.orderSumStatus1}`).pipe();
  }
  getSumStatus2(): Observable<any> {
    return this.http.get(`${this.orderSumStatus2}`).pipe();
  }
  getSumStatus3(): Observable<any> {
    return this.http.get(`${this.orderSumStatus3}`).pipe();
  }
  getSumAll(): Observable<any> {
    return this.http.get(`${this.orderSumAll}`).pipe();
  }
  getCountStatus0(): Observable<any> {
    return this.http.get(`${this.orderCountStatus0}`).pipe();
  }
  getCountStatus1(): Observable<any> {
    return this.http.get(`${this.orderCountStatus1}`).pipe();
  }
  getCountStatus2(): Observable<any> {
    return this.http.get(`${this.orderCountStatus2}`).pipe();
  }
  getCountStatus3(): Observable<any> {
    return this.http.get(`${this.orderCountStatus3}`).pipe();
  }
  getCountAll(): Observable<any> {
    return this.http.get(`${this.orderCountAll}`).pipe();
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
