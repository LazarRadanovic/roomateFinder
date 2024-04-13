import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UsersFriends } from '../models/Users-friend';
import { RoommateReqest } from '../models/Roommate-request';
import { FormGroup } from '@angular/forms';
import { User } from '../models/User';
import { CurrentRoommate } from '../models/Current-roommate';
import { LoggedUserRequest } from '../models/Logged-User-Requests';
import { EditUser } from '../models/Edit-user';
import { FriendshipCreate } from '../models/Friendship-create-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api_url = environment.API_URL;
  constructor(private http: HttpClient, private auth: AuthService) {}

  deleteFriend(friend: number, loggedUser: number) {
    const params = {
      friendId: friend,
      loggedUserId: loggedUser,
    };

    return this.http.post(`${this.api_url}/delete-friend`, params);
  }

  loggedUserFrineds(): Observable<UsersFriends[]> {
    const loggedUserId = this.auth.getUserData().id;
    const params = new HttpParams().set(
      'loggedUserId',
      loggedUserId.toString()
    );
    return this.http.get<UsersFriends[]>(`${this.api_url}/friends`, {
      params,
    });
  }

  roomateRequest(
    senderID: number,
    receiverID: number,
    idEstate: number
  ): Observable<boolean> {
    const roomateReq: RoommateReqest = {
      senderId: senderID,
      idEstate: idEstate,
      receiverId: receiverID,
      status: 'Pending',
    };
    return this.http.post<boolean>(
      `${this.api_url}/roomate/send-request`,
      roomateReq
    );
  }

  currentRoomate(loggedUserId: number): Observable<CurrentRoommate> {
    const params = {
      loggedUserId: loggedUserId,
    };
    return this.http.post<CurrentRoommate>(
      `${this.api_url}/current/roommate`,
      params
    );
  }

  getLoggedUserRommateRequest(
    loggedUserId: number
  ): Observable<LoggedUserRequest[]> {
    const params = new HttpParams().set(
      'loggedUserID',
      loggedUserId.toString()
    );

    return this.http.get<LoggedUserRequest[]>(
      `${this.api_url}/roommate-request-list`,
      { params }
    );
  }

  acceptRoommateRequest(idTable: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      `${this.api_url}/accept-roommate-request`,
      { idTable },
      {
        headers,
      }
    );
  }

  declineRoommateRequest(idTable: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      `${this.api_url}/decline-roommate-request`,
      { idTable },
      {
        headers,
      }
    );
  }

  editUser(user: EditUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.api_url}/edit-user`, user);
  }

  changePassword(password: string, id: number): Observable<boolean> {
    const body = {
      newPassword: password,
      id: id,
    };
    return this.http.post<boolean>(`${this.api_url}/update-password`, body);
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
    return this.http.post(
      `${this.api_url}/accept-request`,
      { idTable },
      {
        headers,
      }
    );
  }

  getAllUsers(id: number): Observable<User[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<User[]>(`${this.api_url}/users`, { params });
  }
  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api_url}/delete-user/${id}`);
  }
}
