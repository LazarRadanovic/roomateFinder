import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  selectedLink: string = '';

  selectLink(link: string): void {
    this.selectedLink = link;
  }
}
