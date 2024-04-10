import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/User';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
  @Input() toggleModal: boolean = false;
  loggedUserId: number = this.auth.getUserData().id;
  @Output() passwordChanged: boolean = false;
  form: UntypedFormGroup;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }
  prepareForm() {
    this.form = new UntypedFormGroup({
      password: new UntypedFormControl(''),
    });
  }
  updatePassword() {
    const newPassword = this.form.get('password').value;
    this.userService
      .changePassword(newPassword, this.loggedUserId)
      .subscribe((data: boolean) => {
        if (data) {
          this.toaster.success('', 'Your password has been updated', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      });
  }
}
