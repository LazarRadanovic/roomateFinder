import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.scss',
})
export class ViewMessagesComponent {
  @Input() messages: string[];
}
