import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoggedUserRequest } from '../../../models/Logged-User-Requests';
import { log } from 'console';
import { UserService } from '../../../services/user-service.service';
import { UsersFriends } from '../../../models/Users-friend';
import { CurrentRoommate } from '../../../models/Current-roommate';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  selectedLink: string = 'messages';
  loggedUserId: number = this.auth.getUserData().id;
  loggedUserRequests: LoggedUserRequest[];
  userFriends: UsersFriends[];
  loggedUserRoomateData: CurrentRoommate;
  constructor(private auth: AuthService, private UserService: UserService) {}
  ngOnInit(): void {
    this.getLoggedUserRequests();
    this.loggedUserFriends();
    this.loggedUserRoommate();
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

  loggedUserRoommate() {
    this.UserService.currentRoomate(this.loggedUserId).subscribe(
      (data: CurrentRoommate) => {
        console.log(data);
        this.loggedUserRoomateData = data;
      }
    );
  }
}
