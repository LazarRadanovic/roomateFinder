import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event-service.service';
import { EventModel } from '../../../models/EventModel';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  events: EventModel[];
  currentEventIndex: number;
  isAdmin: boolean;
  toggleAddEvent: boolean;
  constructor(
    private eventService: EventService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.toggleAddEvent = false;
    if (sessionStorage.getItem('added-event') == 'true') {
      this.toastr.success('Added new event!', 'Success!');
      sessionStorage.removeItem('added-event');
    }
    this.eventService.getAllEvents().subscribe((data: EventModel[]) => {
      this.events = data;
    });
    this.isAdmin = this.auth.getUserData().isAdmin;
  }

  setCurrentEventIndex(i: number) {
    this.currentEventIndex = i;
  }

  toggleModal(value: boolean) {
    this.toggleAddEvent = value;
    sessionStorage.setItem('added-event', 'true');
    window.location.reload();
  }
}
