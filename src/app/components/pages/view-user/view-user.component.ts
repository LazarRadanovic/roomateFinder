import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { authService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent implements OnInit {
  friendStatus: string;
  loggedUser: User = this.auth.getUserData();
  user: User = new User();
  constructor(
    private auth: authService,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activedRoute.params.subscribe((paramsData) => {
      const userId = paramsData['id'];
      console.log(typeof userId);
      this.auth.getUserById(parseInt(userId)).subscribe((data) => {
        this.user = data;
        console.log(this.user);
      });
    });
    this.checkStatus();
  }

  addFriend() {
    this.activedRoute.params.subscribe((paramsData) => {
      const receiverId = paramsData['id'];
      this.auth
        .sendFriendRequest(this.loggedUser.id, parseInt(receiverId))
        .subscribe((data: boolean) => {
          if (data) {
            alert('Poslat je zahtjev za prijateljstvo');
          } else {
            alert('greska');
          }
        });
    });
  }

  checkStatus() {
    this.activedRoute.params.subscribe((paramsData) => {
      const receiverId = paramsData['id'];
      this.auth
        .areFriends(this.loggedUser.id, parseInt(receiverId))
        .subscribe((data: any) => {
          console.log(data);

          this.friendStatus = data.status;
          console.log(this.friendStatus);
        });
    });
  }
}
