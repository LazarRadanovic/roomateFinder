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
  numberOfLikes: number;
  currentLoggedUserId: number;
  userFriends: UsersFriends[];

  constructor(
    private estateService: EstatesService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private UserService: UserService,
    private toaster: ToastrService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.currentLoggedUserId = this.auth.getUserData().id;
    this.activatedRoute.params.subscribe((params) => {
      const estateId = +params['id'];
      this.estateService.getEstateById(estateId).subscribe((data) => {
        this.estate = data;
        this.checkLoggedUserLike();
        this.countLikes(estateId);
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
        if (data) {
          this.toastr.success('You disliked estate 💔', '', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.countLikes(estateId);
          this.likeIcon = !this.likeIcon;
        } else {
          this.toastr.error('Error 🚨', '', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      });
    } else {
      const estateId = this.estate.id;
      this.UserService.usersLikedEstate(
        this.currentLoggedUserId,
        estateId
      ).subscribe((data: any) => {
        if (data.success) {
          this.likeIcon = !this.likeIcon;
          this.toastr.success('', 'You liked Estate ✋', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.countLikes(estateId);
        } else {
          this.toastr.error('Error', "Can't like estate at this time", {
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
        this.showModal = !this.showModal;
      }
    );
  }
  checkLoggedUserLike() {
    this.UserService.checkLoggedUserLike(
      this.currentLoggedUserId,
      this.estate.id
    ).subscribe((data: boolean) => {
      this.likeIcon = data;
    });
  }
  loggedUserFriends() {
    this.UserService.loggedUserFrineds().subscribe((data: UsersFriends[]) => {
      this.userFriends = data;
    });
  }

  countLikes(idEstate: number) {
    this.estateService
      .countLikesByEstateId(idEstate)
      .subscribe((data: number) => {
        this.numberOfLikes = data;
      });
  }
}
