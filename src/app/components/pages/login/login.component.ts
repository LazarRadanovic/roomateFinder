import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('loggingOut')) {
      window.location.reload();
      localStorage.clear();
    }
  }

  login() {
    if (sessionStorage.getItem('estatesSearch')) {
      this.auth.login(this.user).subscribe((data: any) => {
        if (data.success) {
          localStorage.setItem('userToken', data.token);
          this.router.navigate([sessionStorage.getItem('estatesSearch')]);
        } else {
          alert(data.msg);
        }
      });
    } else {
      this.auth.login(this.user).subscribe((data: any) => {
        if (data.success) {
          localStorage.setItem('userToken', data.token);
          this.router.navigate(['/']);
        } else {
          alert(data.msg);
        }
      });
    }
  }
}
