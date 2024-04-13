import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { data } from 'jquery';
import { User } from '../../../models/User';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrl: './conversation-item.component.scss',
})
export class ConversationItemComponent implements OnInit {
  @Output() isConversationClicked = new EventEmitter<number>();
  @Input() id: number;
  @Input() conversationId: number;
  user: User = new User();
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  reactOnClick() {
    this.isConversationClicked.emit(this.conversationId);
  }
}
