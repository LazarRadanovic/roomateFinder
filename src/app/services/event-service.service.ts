import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../models/EventModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  API = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.API}/events`);
  }

  addEvent(event: EventModel): Observable<boolean> {
    return this.http.post<boolean>(`${this.API}/add-event`, event);
  }
}
