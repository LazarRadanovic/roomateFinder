import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss',
})
export class MessageModalComponent {
  @Input() admin: boolean;

  
}
