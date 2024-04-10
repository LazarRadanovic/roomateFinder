import { Component, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  adminMessageToggle: boolean = false!;
  constructor(private auth: AuthService) {}

  toggleMessageAdmin() {
    this.adminMessageToggle = true;
  }
}
