import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Url = environment.root;
  userId: any
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  login(user:any) {
    return this.httpClient.post(`${this.Url}/users/login`, user);
  }
  

  addUser(user: any) {
    return this.httpClient.post(`${this.Url}/users`, user);
  }
  getUserById(id: string) {
    return this.httpClient.get(`${this.Url}/users/${id}`);
  }
  getUser() {
    return this.httpClient.get(`${this.Url}/users`);
  }
  updateUser(id: string, user: any) {
    return this.httpClient.put(`${this.Url}/users/${id}`, user);
  }
  deleteUser(id: string) {
    return this.httpClient.delete(`${this.Url}/users/${id}`, { headers: this.headers });
  }
  setter(user: any) {
    this.userId = user;
  }
  getter() {
    return this.userId;
  }

}
