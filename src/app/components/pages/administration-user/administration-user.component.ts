import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../../models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administration-user',
  templateUrl: './administration-user.component.html',
  styleUrl: './administration-user.component.scss',
})
export class AdministrationUserComponent implements OnInit {
  loggedUser: User = this.auth.getUserData();
  users: User[] = [];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService
      .getAllUsers(this.loggedUser.id)
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data: boolean) => {
      if (data) {
        this.toastr.success('Success', 'You deleted user!');
        this.ngOnInit();
      } else {
        this.toastr.warning('Error');
      }
    });
  }
}
