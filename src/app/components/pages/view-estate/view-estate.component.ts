import { Component, OnInit } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { EstatesService } from '../services/estates-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { authService } from '../../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReserveEstateComponent } from '../../helpers/reserve-estate/reserve-estate.component';
import { UsersFriends } from '../../../models/Users-friend';
import { UserServiceService } from '../../../services/user-service.service';

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
  isLogged = this.auth.isLogged();
  currentLoggedUserId: number = this.auth.getUserData().id;
  userFriends: UsersFriends[];

  constructor(
    private estateService: EstatesService,
    private activatedRoute: ActivatedRoute,
    private auth: authService,
    private router: Router,
    private dialog: MatDialog,
    private UserService: UserServiceService
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
      this.auth
        .dislikeEstate(this.currentLoggedUserId, estateId)
        .subscribe((data: boolean) => {
          data ? alert(`Succesfully disliked estate`) : alert(`error`);
          this.likeIcon = !this.likeIcon;
        });
    } else {
      const estateId = this.estate.id;
      this.auth
        .usersLikedEstate(this.currentLoggedUserId, estateId)
        .subscribe((data: any) => {
          if (data.success) {
            this.likeIcon = !this.likeIcon;
            alert('You Liked Estate');
          } else {
            alert(`Error occured`);
          }
        });
    }
  }
  toggleModal() {
    this.auth.usersLikes(this.estate.id).subscribe((userData: User[]) => {
      this.users = userData;
      console.log(this.users);
      this.showModal = !this.showModal;
      console.log(this.showModal);
    });
  }
  checkLoggedUserLike() {
    this.auth
      .checkLoggedUserLike(this.currentLoggedUserId, this.estate.id)
      .subscribe((data: boolean) => {
        this.likeIcon = data;
        console.log(this.likeIcon);
      });
  }
  loggedUserFriends() {
    this.UserService.loggedUserFrineds().subscribe((data: UsersFriends[]) => {
      console.log(data, 11111);

      this.userFriends = data;
    });
  }
}
