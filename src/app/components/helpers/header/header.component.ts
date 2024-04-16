import { Component, Host, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from '../../../models/Links';
import { OfferComponent } from '../../pages/offer/offer.component';
import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  inputSearch: string = '';
  links: Links[] = [
    { title: 'Home', url: '/' },
    { title: 'Offer', url: '/offer' },
    { title: 'Events', url: '/event' },
  ];
  loggedIn: boolean = this.UserService.isLogged();
  isAdmin: boolean;
  user: User = this.auth.getUserData();
  visibility: boolean;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private activetedRoute: ActivatedRoute,
    private UserService: UserService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('isAdmin') == 'true') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  setVisibility() {
    this.sharedService.headerVisibility.subscribe((data) => {
      this.visibility = data;
    });
  }

  searchByLocation() {
    if (!(this.activetedRoute.snapshot.url.join('/') === 'offer')) {
      this.inputSearch = this.inputSearch.replace(' ', '-');
      this.sharedService.setSearchData(this.inputSearch);
      this.inputSearch = '';
      this.router.navigate(['/offer']);
    }
  }
  logout() {
    if (!localStorage.getItem('loggingOut')) {
      localStorage.setItem('loggingOut', 'true');
      this.router.navigate(['/login']);
    }
  }
  offerClicked() {
    if (this.auth.getUserData()) {
      sessionStorage.setItem('luser', 'true');
    }
  }
}
