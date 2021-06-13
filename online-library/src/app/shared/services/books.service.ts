import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  Url = environment.root;
  BookId:any
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addBook(book: any) {
    return this.httpClient.post(`${this.Url}/books`, book);
  }
  getBookById(id: string) {
    return this.httpClient.get(`${this.Url}/books/${id}`);
  }
  getBook() {
    return this.httpClient.get(`${this.Url}/books`);
  }
  updateBook(id: string, book: any) {
    return this.httpClient.put(`${this.Url}/books/${id}`, book);
  }
  deleteBook(id: string) {
    return this.httpClient.delete(`${this.Url}/books/${id}`, { headers: this.headers });
  }
  setter(book: any) {
    this.BookId = book;
  }
  getter() {
    return this.BookId;
  }
}
