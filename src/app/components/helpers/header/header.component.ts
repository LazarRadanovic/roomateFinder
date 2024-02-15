import { Component, Host, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from '../../../models/Links';
import { OfferComponent } from '../../pages/offer/offer.component';
import { SharedService } from '../../../services/shared.service';
import { authService } from '../../../services/auth.service';

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
    { title: 'About', url: '/about-us' },
  ];
  loggedIn: boolean = this.auth.isLogged();

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private activetedRoute: ActivatedRoute,
    private auth: authService
  ) {}

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
    this.router.navigate(['/']);
    localStorage.clear();
  }
}
