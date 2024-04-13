import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/Message';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrl: './view-conversation.component.scss',
})
export class ViewConversationComponent implements OnInit {
  @Input() selectConversation: number;
  form: UntypedFormGroup;
  messages: Message[] = [];
  user: User;
  conversationUser: User = new User();
  constructor(
    private messageService: MessagesService,
    private auth: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.prepareFormControl();
    this.user = this.auth.getUserData();
    this.messageService
      .getConversationById(this.selectConversation)
      .subscribe((data: any) => {
        this.messages = data;
      });
  }
  prepareFormControl() {
    this.form = new UntypedFormGroup({
      content: new UntypedFormControl(null, Validators.required),
    });
  }

  sendMessage() {
    this.getRecepientData();
  }

  getRecepientData() {
    if (this.messages[0].sender_id != this.user.id) {
      this.userService
        .getUserById(this.messages[0].sender_id)
        .subscribe((data: User) => {
          this.conversationUser = data;

          this.callSendMessage();
        });
    } else {
      this.userService
        .getUserById(this.messages[0].receiver_id)
        .subscribe((data: User) => {
          this.conversationUser = data;

          this.callSendMessage();
        });
    }
  }

  callSendMessage() {
    const content: string = this.form.get('content').value;
    this.messageService
      .sendMessage(
        this.user.id,
        this.conversationUser.id,
        content,
        'unseen',
        this.selectConversation
      )
      .subscribe((data: boolean) => {
        if (data) {
          this.ngOnInit();
        }
      });
  }
}
