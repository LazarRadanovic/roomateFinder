import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchDataSubject = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();

  private viewUser = new BehaviorSubject<User>(new User());
  searchUser$ = this.viewUser.asObservable();

  setSearchData(data: string) {
    this.searchDataSubject.next(data);
  }

  setViewUser(user: User) {
    this.viewUser.next(user);
  }
}
