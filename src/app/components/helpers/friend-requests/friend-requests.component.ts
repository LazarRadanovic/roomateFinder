import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { LoggedUserRequest } from '../../../models/Logged-User-Requests';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss',
})
export class FriendRequestsComponent {
  @Input() listOfUsers: LoggedUserRequest[];
  friend_aceppted: boolean;

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private auth: AuthService
  ) {}

  addFriend(idTable: number) {
    this.userService.acceptFriendRequest(idTable).subscribe((data: any) => {
      if (data.success) {
        this.toaster.success(
          'You added a friend',
          'You succesfully added a friend',
          { timeOut: 3000, positionClass: 'toast-bottom-right' }
        );
        this.userService
          .getLoggedUserRequest(this.auth.getUserData().id)
          .subscribe((data: LoggedUserRequest[]) => {
            this.listOfUsers = data;
          });
      } else {
        this.toaster.warning('Error', 'Some Error Occured', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }
  reloadComponent() {
    console.log('Reloading component...');
    const currentUrl = this.router.url;

    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      replaceUrl: false,
    };

    this.router.navigateByUrl(currentUrl, navigationExtras);
  }
}
