import { Component, Input } from '@angular/core';
import { EventModel } from '../../../models/EventModel';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss',
})
export class EventModalComponent {
  @Input() event: EventModel[];
  @Input() index: number;
}
