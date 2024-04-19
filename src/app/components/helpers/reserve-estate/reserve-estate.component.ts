import { Component, Input, OnInit } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentRoommate } from '../../../models/Current-roommate';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrls: ['./reserve-estate.component.scss'],
})
export class ReserveEstateComponent implements OnInit {
  @Input() listOfFriends: UsersFriends[];
  @Input() estateID: number;
  loggedUser = this.auth.getUserData();
  canReserve: boolean = true;
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.userService
      .currentRoomate(this.loggedUser.id)
      .subscribe((data: CurrentRoommate) => {
        if (data == null) {
          this.canReserve = true;
          console.log(this.canReserve);
        } else {
          this.canReserve = false;
          console.log(this.canReserve);
        }
      });
  }

  resrveEstate(friendId: number) {
    if (this.canReserve) {
      this.userService
        .roomateRequest(this.loggedUser.id, friendId, this.estateID)
        .subscribe((data: boolean) => {
          if (data) {
            let friend = this.listOfFriends.filter(
              (e) => e.friendId === friendId
            );
            this.toast.success(
              `Poslat zahtjev za cimera`,
              `Vas Zahtjev za cimera je uspjesno poslat korisniku ${friend[0].friendIme}`,
              { timeOut: 4000, positionClass: 'toast-bottom-right' }
            );
          } else {
            this.toast.warning(
              `Poslat zahtjev za cimera`,
              `Vas Zahtjev za cimera je uspjesno poslat`,
              { timeOut: 4000, positionClass: 'toast-bottom-right' }
            );
          }
        });
    } else {
      this.toast.warning(`You have roommate`, `⚠️`, {
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
      });
    }
  }
  toogleToastr() {
    this.toast.warning('You already have roommate!', 'First cancel roommate!');
  }
}
