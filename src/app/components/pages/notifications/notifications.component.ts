import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/auth.service';
import { LoggedUserRequest } from '../../../models/Logged-User-Requests';
import { log } from 'console';
import { UserServiceService } from '../../../services/user-service.service';
import { UsersFriends } from '../../../models/Users-friend';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  selectedLink: string = '';
  loggedUserId: number = this.auth.getUserData().id;
  loggedUserRequests: LoggedUserRequest[];
  userFriends: UsersFriends[];
  constructor(
    private auth: authService,
    private UserService: UserServiceService
  ) {}
  ngOnInit(): void {
    this.getLoggedUserRequests();
    this.loggedUserFriends();
  }

  selectLink(link: string): void {
    this.selectedLink = link;
  }

  getLoggedUserRequests() {
    this.auth
      .getLoggedUserRequest(this.loggedUserId)
      .subscribe((data: LoggedUserRequest[]) => {
        this.loggedUserRequests = data;
      });
  }

  loggedUserFriends() {
    this.UserService.loggedUserFrineds().subscribe((data: UsersFriends[]) => {
      this.userFriends = data;
    });
  }
}
