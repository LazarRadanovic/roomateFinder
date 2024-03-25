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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api_url = environment.API_URL;
  loggedUserId = this.auth.getUserData().id;
  constructor(private http: HttpClient, private auth: AuthService) {}

  deleteFriend(friend: number, loggedUser: number) {
    const params = {
      friendId: friend,
      loggedUserId: loggedUser,
    };
    console.log(params);

    return this.http.post(`${this.api_url}/delete-friend`, params);
  }

  loggedUserFrineds(): Observable<UsersFriends[]> {
    const params = new HttpParams().set(
      'loggedUserId',
      this.loggedUserId.toString()
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

  getLoggedUserRequest(loggedUserId: number): Observable<LoggedUserRequest[]> {
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

  editUser(userData: User) {}
}
