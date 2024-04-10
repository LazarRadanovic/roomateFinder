import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/Message';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrl: './view-conversation.component.scss',
})
export class ViewConversationComponent implements OnInit {
  @Input() selectConversation: number;
  @Input() id: number;
  messages: Message[] = [];
  constructor(private messageService: MessagesService) {}
  ngOnInit(): void {
    this.messageService
      .getConversationById(this.selectConversation)
      .subscribe((data: any) => {
        this.messages = data;
        console.log(data);
      });
  }
}
