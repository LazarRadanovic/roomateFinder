import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/User';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-conversation',
  templateUrl: './user-conversation.component.html',
  styleUrls: ['./user-conversation.component.scss'],
})
export class UserConversationComponent {
  @Input() loggedUser: User = new User();
  @Input() receiverUser: User = new User();
  messageText: string = '';
  @Output() toggleModal = new EventEmitter<boolean>();

  constructor(
    private messageService: MessagesService,
    private router: Router
  ) {}

  startConversation() {
    const status = 'unseen';
    this.checkConversation().subscribe((result: any) => {
      if (result && result.length > 0) {
        const conversation = this.loopAroundConversation(
          result,
          this.loggedUser.id,
          this.receiverUser.id
        );
        if (conversation) {
          this.sendMessage(status, conversation.id);
        } else {
          this.messageService
            .creatConversation(this.loggedUser.id, this.receiverUser.id)
            .subscribe((data: any) => {
              if (data.success) {
                this.sendMessage(status, data.conversationId);
              }
            });
        }
      }
    });
  }

  sendMessage(status: string, conversationId: any) {
    this.messageService
      .sendMessage(
        this.loggedUser.id,
        this.receiverUser.id,
        this.messageText,
        status,
        conversationId
      )
      .subscribe((data: boolean) => {
        sessionStorage.setItem('modalMessage', 'true');
        this.router.navigate(['/notifaction']);
        this.modalReact(true);
      });
  }

  modalReact(value: boolean) {
    this.toggleModal.emit(value);
  }

  checkConversation() {
    return this.messageService.getAllConversations();
  }

  loopAroundConversation(arr: any, id: number, receiverId: number) {
    for (let i = 0; i < arr.length; i++) {
      if (
        (id == arr[i].user_1 && receiverId == arr[i].user_2) ||
        (receiverId == arr[i].user_1 && id == arr[i].user_2)
      ) {
        return arr[i];
      }
    }
    return null;
  }
}
