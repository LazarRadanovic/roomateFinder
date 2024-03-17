import { Component, Input, OnInit } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrls: ['./reserve-estate.component.scss'],
})
export class ReserveEstateComponent implements OnInit {
  @Input() listOfFriends: UsersFriends[];
  ngOnInit(): void {
    console.log(this.listOfFriends);
  }
}
