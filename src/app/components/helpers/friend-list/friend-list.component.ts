import { Component, Input } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  @Input() listOfFriends: UsersFriends[];
  loggedUserId: number = this.auth.getUserData().id;

  constructor(
    private UserService: UserService,
    private toaster: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  deleteFriend(friendId: number) {
    this.UserService.deleteFriend(friendId, this.loggedUserId).subscribe(
      (data: any) => {
        if (data.success) {
          this.toaster.success(
            'Deleted a friend',
            'You succesfully deleted a friend',
            { timeOut: 4000, positionClass: 'toast-bottom-right' }
          );
          this.UserService.loggedUserFrineds().subscribe(
            (data: UsersFriends[]) => {
              this.listOfFriends = data;
            }
          );
        } else {
          this.toaster.warning('Error', 'Some Error Occured', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        }
      }
    );
  }
}
