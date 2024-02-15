// // offer.component.ts
import { Component, Host, OnInit } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { environment } from '../../../../environments/environment.development';
import { EstatesService } from '../services/estates-service.service';
import { HeaderComponent } from '../../helpers/header/header.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  estates: Estate[] = [];
  api_url = environment.API_URL;
  searchInputData: string = '';

  constructor(
    private estateService: EstatesService,
    private sharedService: SharedService // @Host() private header: HeaderComponent
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

  // searchByLocation(town: string) {
  //   this.estateService
  //     .getEstatesByLocation(this.header.inputSearch)
  //     .subscribe((data) => {
  //       this.estates = data;
  //     });
  // }
}
