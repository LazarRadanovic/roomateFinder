import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { stat } from 'fs';

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
    const params = new HttpParams().set(
      'conversationId',
      conversationId.toString()
    );
    return this.http.get<Message[]>(`${this.api_url}/messages`, { params });
  }

  sendMessage(
    sender_id: number,
    receiver_id: number,
    content: string,
    status: string,
    conversation_id: number
  ): Observable<boolean> {
    const body = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      content: content,
      status: status,
      conversation_id: conversation_id,
    };

    return this.http.post<boolean>(`${this.api_url}/send-message`, body);
  }
}
