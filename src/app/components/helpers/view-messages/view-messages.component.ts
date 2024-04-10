import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { data } from 'jquery';
import { Conversation } from '../../../models/Conversation';
import { error } from 'console';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.scss',
})
export class ViewMessagesComponent implements OnInit {
  conversations: Conversation[] = [];
  user: User;
  loggedUser: User;
  isConversationOpened: boolean = false;
  selectConversation: number;

  constructor(
    private messageService: MessagesService,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.selectConversation = 0;
    this.getAllConversations();
    this.loggedUser = this.auth.getUserData();
  }

  getAllConversations() {
    this.messageService.getAllConversations().subscribe((data: any) => {
      this.conversations = data;
    });
  }

  getConversationsUser(id: number) {
    console.log(id);

    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
    });
  }
  isConversationClick(id: number) {
    this.isConversationOpened = true;
    this.selectConversation = id;
  }
}
