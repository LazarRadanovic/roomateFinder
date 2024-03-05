import { Component, Input } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrl: './reserve-estate.component.scss',
})
export class ReserveEstateComponent {
  @Input() listOfFriends: UsersFriends[];
}
