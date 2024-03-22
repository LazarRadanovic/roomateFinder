import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../services/estates-service.service';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  towns: string[];
  user: User = new User();

  constructor(
    private estateService: EstatesService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.estateService.getAllTowns().subscribe((data) => {
      this.towns = data;
    });
  }
  registration() {
    this.auth.register(this.user).subscribe((data: any) => {
      if (data.success) {
        alert('Registarcija uspjesna');
        localStorage.setItem('userToken', data.token);
        this.router.navigate(['/user']);
      }
    });
  }
}
