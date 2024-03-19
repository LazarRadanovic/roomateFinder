import { Component, Input, OnInit } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';
import { authService } from '../../../services/auth.service';
import { UserServiceService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrls: ['./reserve-estate.component.scss'],
})
export class ReserveEstateComponent implements OnInit {
  @Input() listOfFriends: UsersFriends[];
  loggedUser = this.auth.getUserData();
  constructor(
    private auth: authService,
    private userService: UserServiceService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {}

  resrveEstate(friendId: number) {
    this.userService
      .roomateRequest(this.loggedUser.id, friendId)
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
