import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchDataSubject = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();

  private removeHeaderSubject = new BehaviorSubject<boolean>(false);
  headerVisibility = this.removeHeaderSubject.asObservable();

  setSearchData(data: string) {
    this.searchDataSubject.next(data);
  }

  setHeaderVisibility(visibility: boolean) {
    this.removeHeaderSubject.next(visibility);
  }
}
