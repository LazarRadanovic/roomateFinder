import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendshipCreate } from '../models/Friendship-create-model';
import { LoggedUserRequest } from '../models/Logged-User-Requests';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url = environment.API_URL;
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.api_url}/registration`, user);
  }
  login(user: User) {
    return this.http.post(`${this.api_url}/login`, user);
  }
  getUserData() {
    const token = localStorage.getItem('userToken');
    if (!token) return null;
    const tokenParts = token.split('.');
    const userDataPart = tokenParts[1];
    const user = JSON.parse(window.atob(userDataPart));
    return user;
  }

}