import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent implements OnInit {
  friendStatus: string;
  loggedUser: User = new User();
  user: User = new User();
  toggleModal: boolean;
  constructor(
    private UserSerivce: UserService,
    private activedRoute: ActivatedRoute,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.toggleModal = false;
    this.loggedUser = this.auth.getUserData();
    this.activedRoute.params.subscribe((paramsData) => {
      const userId = paramsData['id'];
      this.UserSerivce.getUserById(parseInt(userId)).subscribe((data) => {
        this.user = data;
      });
    });
    this.checkStatus();
  }

  addFriend() {
    this.activedRoute.params.subscribe((paramsData) => {
      const receiverId = paramsData['id'];
      this.UserSerivce.sendFriendRequest(
        this.loggedUser.id,
        parseInt(receiverId)
      ).subscribe((data: boolean) => {
        if (data) {
          alert('Poslat je zahtjev za prijateljstvo');
          this.checkStatus();
        } else {
          alert('greska');
        }
      });
    });
  }

  checkStatus() {
    this.activedRoute.params.subscribe((paramsData) => {
      const receiverId = paramsData['id'];
      this.UserSerivce.areFriends(
        this.loggedUser.id,
        parseInt(receiverId)
      ).subscribe((data: any) => {
        this.friendStatus = data.status;
      });
    });
  }
  reactModal(value: boolean) {
    this.toggleModal = value;
  }
}
