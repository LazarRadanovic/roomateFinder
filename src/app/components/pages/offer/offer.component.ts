// // offer.component.ts
import { Component, Host, OnInit } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { environment } from '../../../../environments/environment.development';
import { EstatesService } from '../services/estates-service.service';
import { SharedService } from '../../../services/shared.service';
import { authService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  estates: Estate[] = [];
  api_url = environment.API_URL;
  searchInputData: string = '';
  isLogged: boolean = this.auth.isLogged();

  constructor(
    private estateService: EstatesService,
    private sharedService: SharedService, // @Host() private header: HeaderComponent
    private auth: authService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.searchData$.subscribe((data) => {
      this.searchInputData = data;
    });
    if (this.searchInputData) {
      this.estateService
        .getEstatesByLocation(this.searchInputData)
        .subscribe((data) => {
          this.estates = data;
          this.sharedService.setSearchData('');
        });
    } else {
      this.estateService.getAllEstates().subscribe((data) => {
        this.estates = data;
      });
    }
  }
  navigateLoggedOutUser(id: number) {
    sessionStorage.setItem('estatesSearch', `/view-estate/${id}`);
    this.router.navigate(['/login']);
  }

  // searchByLocation(town: string) {
  //   this.estateService
  //     .getEstatesByLocation(this.header.inputSearch)
  //     .subscribe((data) => {
  //       this.estates = data;
  //     });
  // }
}
