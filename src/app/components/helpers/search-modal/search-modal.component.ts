import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../../pages/services/estates-service.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit {
  towns: string[];
  constructor(private estateService: EstatesService) {}

  ngOnInit(): void {
    this.estateService.getAllTowns().subscribe((data) => {
      this.towns = data;
    });
  }
}
