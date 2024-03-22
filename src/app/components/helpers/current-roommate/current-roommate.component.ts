import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { CurrentRoommate } from '../../../models/Current-roommate';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-current-roommate',
  templateUrl: './current-roommate.component.html',
  styleUrl: './current-roommate.component.scss',
})
export class CurrentRoommateComponent implements OnInit {
  @Input() user: CurrentRoommate;
  ngOnInit(): void {
    console.log(this.user);
  }
}
