import { Injectable } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstatesService {
  api_url = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllEstates() {
    return this.http.get<Estate[]>(`${this.api_url}/estates`);
  }

  getEstatesByLocation(town: string) {
    return this.http.get<Estate[]>(`${this.api_url}/estates/location/${town}`);
  }

  getAllTowns() {
    return this.http.get<string[]>(`${this.api_url}/towns`);
  }

  getEstateById(id: number): Observable<Estate> {
    return this.http.get<Estate>(`${this.api_url}/estates/${id}`);
  }
}
