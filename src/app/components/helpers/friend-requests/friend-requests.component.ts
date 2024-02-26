import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss',
})
export class FriendRequestsComponent {
  @Input() listOfUsers: User[] = [];
}
