import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user-service.service';
import { EditUser } from '../../../../models/Edit-user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  form: UntypedFormGroup;
  currentLoggedUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prepareForm();
    this.getCurrentLoggedUserDetails();
    this.populateForm();
  }

  private prepareForm() {
    this.form = new UntypedFormGroup({
      ime: new UntypedFormControl(''),
      prezime: new UntypedFormControl(''),
      lokacija_cimera: new UntypedFormControl(''),
    });
  }

  getCurrentLoggedUserDetails() {
    this.currentLoggedUser = this.authService.getUserData();
  }

  private populateForm() {
    if (this.currentLoggedUser) {
      this.form.patchValue({
        ime: this.currentLoggedUser.ime,
        prezime: this.currentLoggedUser.prezime,
        lokacija_cimera: this.currentLoggedUser.lokacija_cimera,
      });
    }
  }

  save() {
    const user: EditUser = {
      id: this.authService.getUserData().id,
      ime: this.form.get('ime').value,
      prezime: this.form.get('prezime').value,
      lokacija_cimera: this.form.get('lokacija_cimera').value,
    };
    this.userService.editUser(user).subscribe((data: boolean) => {
      if (data) {
        sessionStorage.setItem('personal-info', 'true');
        this.router.navigate(['/login']);
      } else {
        this.toaster.error('error occured');
      }
    });
  }
}
