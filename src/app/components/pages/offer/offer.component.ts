import { Component, Host, Input, OnInit } from '@angular/core';
import { Estate } from '../../../models/Estate';
import { environment } from '../../../../environments/environment.development';
import { EstatesService } from '../services/estates-service.service';
import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  loading: boolean = false;
  filterActive: boolean = false;
  estates: Estate[] = [];
  api_url = environment.API_URL;
  searchInputData: string = '';
  isAdmin: boolean = this.auth.getUserData().isAdmin;
  isLogged: boolean = this.userService.isLogged();

  constructor(
    private estateService: EstatesService,
    private sharedService: SharedService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sharedService.searchData$.subscribe((data) => {
      this.searchInputData = data;
    });

    if (this.searchInputData) {
      this.estateService
        .getEstatesByLocation(this.searchInputData)
        .subscribe((data) => {
          this.estates = data;
          this.loading = false;
          this.sharedService.setSearchData('');
        });
    } else {
      this.estateService.getAllEstates().subscribe((data) => {
        this.estates = data;
        this.loading = false;
      });
    }
  }
  navigateLoggedOutUser(id: number) {
    sessionStorage.setItem('estatesSearch', `/view-estate/${id}`);
    this.router.navigate(['/login']);
  }

  filterEstates() {
    this.filterActive = !this.filterActive;
  }

  sortTownSelected(estatess: Estate[]) {
    this.estates = estatess;
  }
  deleteEstate(id: number) {
    this.estateService.deleteEstate(id).subscribe((data: boolean) => {
      if (data) {
        this.toastr.success('Success', 'You deleted estate!');
        this.ngOnInit();
      } else {
        this.toastr.warning('Error');
      }
    });
  }
}
