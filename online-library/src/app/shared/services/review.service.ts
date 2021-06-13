import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  Url = environment.root;
  ReviewId:any
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addReview(book: any) {
    return this.httpClient.post(`${this.Url}/reviews`, book);
  }
  getReviewById(id: number) {
    return this.httpClient.get(`${this.Url}/reviews/${id}`);
  }
  getReview() {
    return this.httpClient.get(`${this.Url}/reviews`);
  }
  updateReview(id: number, book: any) {
    return this.httpClient.put(`${this.Url}/reviews/${id}`, book);
  }
  deleteReview(id: number) {
    return this.httpClient.delete(`${this.Url}/reviews/${id}`, { headers: this.headers });
  }
  setter(book: any) {
    this.ReviewId = book;
  }
  getter() {
    return this.ReviewId;
  }
}
