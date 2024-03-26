import { Component, Host, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from '../../../models/Links';
import { OfferComponent } from '../../pages/offer/offer.component';
import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  inputSearch: string = '';
  links: Links[] = [
    { title: 'Home', url: '/' },
    { title: 'Offer', url: '/offer' },
    { title: 'Events', url: '/event' },
  ];
  loggedIn: boolean = this.auth.isLogged();
  user: User = this.auth.getUserData();
  visibility: boolean;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private activetedRoute: ActivatedRoute,
    private auth: AuthService
  ) {}

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
    // Nastavite sa svojom logikom ili navigacijom
  }
  logout() {
    if (!localStorage.getItem('loggingOut')) {
      localStorage.setItem('loggingOut', 'true');
      this.router.navigate(['/login']);
    }
  }
}
