import { Component, Inject, Input } from '@angular/core';
import { UsersFriends } from '../../../models/Users-friend';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/User';

@Component({
  selector: 'app-reserve-estate',
  templateUrl: './reserve-estate.component.html',
  styleUrl: './reserve-estate.component.scss',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
  ],
})
export class ReserveEstateComponent {
  listOfFriends: UsersFriends[];

  constructor(
    private dialogRef: MatDialogRef<ReserveEstateComponent>,
    @Inject(MAT_DIALOG_DATA) data: UsersFriends[]
  ) {
    this.listOfFriends = data;
  }
}
