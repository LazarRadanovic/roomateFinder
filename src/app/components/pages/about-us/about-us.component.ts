import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event-service.service';
import { EventModel } from '../../../models/EventModel';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  events: EventModel[];
  currentEventIndex: number;
  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data: EventModel[]) => {
      this.events = data;
    });
  }

  setCurrentEventIndex(i: number) {
    this.currentEventIndex = i;
  }
}
