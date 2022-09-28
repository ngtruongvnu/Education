import { Review } from './../models/review';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const urlApi = 'http://localhost:8888/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAllReviews(page: number, numberItems: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      urlApi + '/get-all-Reviews?page=' + page + '&numberItems=' + numberItems
    );
  }
  filter(
    filter: string,
    page: number,
    numberItems: number
  ): Observable<Review[]> {
    return this.http.get<Review[]>(
      urlApi +
        '/filter?filter=' +
        filter +
        '&page=' +
        page +
        '&numberItems=' +
        numberItems
    );
  }
  getById(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(urlApi + '/get-Review?id=' + id);
  }
  getReceivedReviewsByEmail(email: string): Observable<Review[]> {
    return this.http.get<Review[]>(
      urlApi + '/get-received-Review?email=' + email
    );
  }
  getSentReviewsByEmail(email: string): Observable<Review[]> {
    return this.http.get<Review[]>(urlApi + '/get-sent-Review?email=' + email);
  }

  getCommentByEmailAndRate(email: string, rate: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      urlApi + '/get-Review-By-Rate?email=' + email + '&rate=' + rate
    );
  }

  getAverageRate(email: string): Observable<number> {
    return this.http.get<number>(urlApi + '/get-average?email=' + email);
  }

  insertReview(Review: Review): Observable<String> {
    return this.http.post(urlApi + '/insert-Review', Review, {
      responseType: 'text',
    });
  }
}
