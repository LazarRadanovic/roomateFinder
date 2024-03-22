import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-liked-modal',
  templateUrl: './liked-modal.component.html',
  styleUrl: './liked-modal.component.scss',
})
export class LikedModalComponent {
  @Input() users: User[];
  @Input() currentLoggedUserId: number;
}
