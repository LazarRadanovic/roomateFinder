import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstatesService } from '../../pages/services/estates-service.service';
import { Estate } from '../../../models/Estate';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit {
  towns: string[];
  @Output() optionSelected = new EventEmitter<Estate[]>();

  constructor(private estateService: EstatesService) {}

  ngOnInit(): void {
    this.estateService.getAllTowns().subscribe((data) => {
      this.towns = data;
    });
  }
  onOptionSelected(event: any) {
    const selectedOption: string = event.target.value;

    this.estateService
      .getEstatesByLocation(selectedOption)
      .subscribe((data) => {
        this.optionSelected.emit(data);
      });
  }
}
