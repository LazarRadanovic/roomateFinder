import { Component, Input, OnInit } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrls: ['./reserve-estate.component.scss'],
})
export class ReserveEstateComponent implements OnInit {
  @Input() listOfFriends: UsersFriends[];
  @Input() estateID: number;
  loggedUser = this.auth.getUserData();
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {}

  resrveEstate(friendId: number) {
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
  }
}
