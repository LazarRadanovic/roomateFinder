import { Component } from '@angular/core';
import { User } from '../../../models/User';
import { authService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = new User();
  constructor(private auth: authService, private router: Router) {}

  login() {
    this.auth.login(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('userToken', data.token);
        this.user = this.auth.getUserData();
        this.router.navigate(['/user']);
      } else {
        alert(data.msg);
      }
    });
  }
}
