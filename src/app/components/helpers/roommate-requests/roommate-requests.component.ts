import { Component, Input } from '@angular/core';
import { LoggedUserRequest } from '../../../models/Logged-User-Requests';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user-service.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-roommate-requests',
  templateUrl: './roommate-requests.component.html',
  styleUrl: './roommate-requests.component.scss',
})
export class RoommateRequestsComponent {
  @Input() roommateRequestsList: LoggedUserRequest[];

  constructor(
    private toaster: ToastrService,
    private UserService: UserService,
    private auth: AuthService
  ) {}

  addRoommateRequest(idTable: number) {
    this.UserService.acceptRoommateRequest(idTable).subscribe((data: any) => {
      if (data.success) {
        this.toaster.success(
          'You just got yourself a new Roommate! ',
          'Congrats!',
          { timeOut: 3000, positionClass: 'toast-bottom-right' }
        );
        this.UserService.getLoggedUserRequest(
          this.auth.getUserData().id
        ).subscribe((data: LoggedUserRequest[]) => {
          this.roommateRequestsList = data;
        });
      } else {
        this.toaster.warning('fix ', 'fix!', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.UserService.getLoggedUserRequest(
          this.auth.getUserData().id
        ).subscribe((data: LoggedUserRequest[]) => {
          this.roommateRequestsList = data;
        });
      }
    });
  }

  declineRoommateRequest(idTable: number) {
    this.UserService.declineRoommateRequest(idTable).subscribe((data: any) => {
      if (data.success) {
        this.toaster.success('You decline roommate request!', ':(', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.UserService.getLoggedUserRequest(
          this.auth.getUserData().id
        ).subscribe((data: LoggedUserRequest[]) => {
          this.roommateRequestsList = data;
        });
      } else {
        this.toaster.warning('fix ', 'fix!', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.UserService.getLoggedUserRequest(
          this.auth.getUserData().id
        ).subscribe((data: LoggedUserRequest[]) => {
          this.roommateRequestsList = data;
        });
      }
    });
  }
}
