import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class authService {
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
  isLogged() {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
