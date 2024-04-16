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
  loggeduser: User = new User();
  constructor(private userService: UserService, private auth: AuthService) {}
  ngOnInit(): void {
    this.loggeduser = this.auth.getUserData();
    this.userService
      .currentRoomate(this.loggeduser.id)
      .subscribe((data: CurrentRoommate) => {
        this.user = data;
      });
  }

  cancelRoomate() {
    this.userService
      .declineRoommateRequest(this.user.RequestID)
      .subscribe((data: any) => {
        if (data.success) {
          this.ngOnInit();
        }
      });
  }
}
