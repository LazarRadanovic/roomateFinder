import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { authService } from '../../../services/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = this.auth.getUserData();

  constructor(private auth: authService) {}
  ngOnInit(): void {}
}
