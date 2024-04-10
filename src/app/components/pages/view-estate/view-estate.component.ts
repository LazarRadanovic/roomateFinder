import { Component, OnInit } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { EstatesService } from '../services/estates-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReserveEstateComponent } from '../../helpers/reserve-estate/reserve-estate.component';
import { UsersFriends } from '../../../models/Users-friend';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-estate',
  templateUrl: './view-estate.component.html',
  styleUrl: './view-estate.component.scss',
})
export class ViewEstateComponent implements OnInit {
  estate: Estate = new Estate();
  users: User[];
  showModal: boolean = false;
  likeIcon: boolean = false;
  reserveModal: boolean = false;
  isLogged = this.UserService.isLogged();
  currentLoggedUserId: number = this.auth.getUserData().id;
  userFriends: UsersFriends[];

  constructor(
    private estateService: EstatesService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private UserService: UserService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const estateId = +params['id']; // +params['id'] parsira string u number
      this.estateService.getEstateById(estateId).subscribe((data) => {
        this.estate = data;
        this.checkLoggedUserLike();
      });
    });
    this.loggedUserFriends();
  }

  userLikedEstate() {
    if (this.likeIcon) {
      const estateId = this.estate.id;
      this.UserService.dislikeEstate(
        this.currentLoggedUserId,
        estateId
      ).subscribe((data: boolean) => {
        data ? alert(`Succesfully disliked estate`) : alert(`error`);
        this.likeIcon = !this.likeIcon;
      });
    } else {
      const estateId = this.estate.id;
      this.UserService.usersLikedEstate(
        this.currentLoggedUserId,
        estateId
      ).subscribe((data: any) => {
        if (data.success) {
          this.likeIcon = !this.likeIcon;
          this.toaster.success('', 'You liked Estate ✋', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        } else {
          this.toaster.error('Error', 'Cant like estate at this time', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      });
    }
  }
  toggleModal() {
    this.UserService.usersLikes(this.estate.id).subscribe(
      (userData: User[]) => {
        this.users = userData;
        console.log(this.users);
        this.showModal = !this.showModal;
        console.log(this.showModal);
      }
    );
  }
  checkLoggedUserLike() {
    this.UserService.checkLoggedUserLike(
      this.currentLoggedUserId,
      this.estate.id
    ).subscribe((data: boolean) => {
      this.likeIcon = data;
      console.log(this.likeIcon);
    });
  }
  loggedUserFriends() {
    this.UserService.loggedUserFrineds().subscribe((data: UsersFriends[]) => {
      this.userFriends = data;
    });
  }
}
