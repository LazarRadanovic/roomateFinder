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

  usersLikes(idEstate: number) {
    return this.http.get<User[]>(`${this.api_url}/user-likes/${idEstate}`);
  }
  usersLikedEstate(idEstate: number, idUser: number) {
    const postData = {
      estateId: idEstate,
      userId: idUser,
    };

    return this.http.post(`${this.api_url}/user-liked-estate/`, postData);
  }

  getUserById(userId: number) {
    return this.http.get<User>(`${this.api_url}/user/${userId}`);
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
  checkLoggedUserLike(userId: number, estateId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('estateId', estateId.toString())
      .set('userId', userId.toString());

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<boolean>(`${this.api_url}/check-user-like/`, {
      params,
      headers,
    });
  }

  dislikeEstate(userId: number, estateId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('estateId', estateId.toString())
      .set('userId', userId.toString());

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete<boolean>(`${this.api_url}/dislike-estate/`, {
      params,
      headers,
    });
  }

  sendFriendRequest(senderId: number, receiverId: number): Observable<boolean> {
    const friendRequest: FriendshipCreate = {
      senderId: senderId,
      receiverId: receiverId,
      status: 'pending',
    };

    return this.http.post<boolean>(
      `${this.api_url}/friendship/send-request`,
      friendRequest
    );
  }

  areFriends(senderId: number, receiverId: number): Observable<any> {
    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('receiverId', receiverId.toString());

    return this.http.get<string>(`${this.api_url}/friendship/status`, {
      params,
    });
  }

  getLoggedUserRequest(loggedUserId: number): Observable<LoggedUserRequest[]> {
    const params = new HttpParams().set('idReciever', loggedUserId.toString());

    return this.http.get<LoggedUserRequest[]>(
      `${this.api_url}/get-friend-requests`,
      { params }
    );
  }

  acceptFriendRequest(idTable: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const params = new HttpParams().set('idTable', idTable.toString());
    return this.http.post(
      `${this.api_url}/accept-request`,
      { idTable },
      {
        headers,
      }
    );
  }
}
