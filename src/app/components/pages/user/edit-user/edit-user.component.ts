import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user-service.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.prepareForm();
    this.getCurrentLoggedUserDetails();
    this.populateForm();
  }

  private prepareForm() {
    this.form = new UntypedFormGroup({
      ime: new UntypedFormControl(''), // Definišemo FormControl za ime
      prezime: new UntypedFormControl(''), // Definišemo FormControl za prezime
      gmail: new UntypedFormControl(''), // Definišemo FormControl za gmail
      lokacija_cimera: new UntypedFormControl(''), // Definišemo FormControl za lokaciju cimera
      password: new UntypedFormControl(''),
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
        gmail: this.currentLoggedUser.gmail,
        lokacija_cimera: this.currentLoggedUser.lokacija_cimera,
        password: this.currentLoggedUser.password,
      });
    }
  }

  save() {
    const userData = { ...this.form, gmail: this.currentLoggedUser.gmail };

    // this.userService.editUser(userData);
  }
}
