import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/auth.service';
import { LoggedUserRequest } from '../../../models/Logged-User-Requests';
import { log } from 'console';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  selectedLink: string = '';
  loggedUserId: number = this.auth.getUserData().id;
  loggedUserRequests: LoggedUserRequest[];
  constructor(private auth: authService) {}
  ngOnInit(): void {
    this.getLoggedUserMessage();
  }

  selectLink(link: string): void {
    this.selectedLink = link;
  }

  getLoggedUserMessage() {
    this.auth
      .getLoggedUserRequest(this.loggedUserId)
      .subscribe((data: LoggedUserRequest[]) => {
        this.loggedUserRequests = data;
        console.log(this.loggedUserRequests);
      });
  }
}
