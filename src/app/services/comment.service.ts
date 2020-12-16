import {Comments} from '../models/Comments';
import {apiUrl} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = `${apiUrl}/comment`;
  private baseurl = 'http://localhost:8080/api/delete/product';

  constructor(private http: HttpClient) {

  }

  createComment1(comments: Comments): Observable<Comments> {
    const url = `${apiUrl}/seller/comment/new`;
    return this.http.post<Comments>(url, comments);
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
