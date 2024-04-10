import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  api_url = environment.API_URL;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllConversations() {
    const loggedUserId = this.auth.getUserData().id;
    const params = new HttpParams().set(
      'loggedUserId',
      loggedUserId.toString()
    );

    return this.http.get(`${this.api_url}/conversations`, { params });
  }

  getConversationById(conversationId: number): Observable<Message[]> {
    const params = {
      conversationId: conversationId,
    };
    return this.http.post<Message[]>(`${this.api_url}/messages`, { params });
  }
}
