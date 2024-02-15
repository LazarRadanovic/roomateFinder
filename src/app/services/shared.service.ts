import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchDataSubject = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();
  private sharedUserSubject = new BehaviorSubject<User>(new User());
  sharedUser$ = this.sharedUserSubject.asObservable();

  setSearchData(data: string) {
    this.searchDataSubject.next(data);
  }

  setSharedUser(newUser: User) {
    this.sharedUserSubject.next(newUser);
  }
}
