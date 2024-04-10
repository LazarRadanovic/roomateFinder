import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LikedModalComponent } from './liked-modal/liked-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewMessagesComponent } from './view-messages/view-messages.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ReserveEstateComponent } from './reserve-estate/reserve-estate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrentRoommateComponent } from './current-roommate/current-roommate.component';
import { RoommateRequestsComponent } from './roommate-requests/roommate-requests.component';
import { EventModalComponent } from './event-modal/event-modal.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { MatInputModule } from '@angular/material/input';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ConversationItemComponent } from './conversation-item/conversation-item.component';
import { ViewConversationComponent } from './view-conversation/view-conversation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    LikedModalComponent,
    ViewMessagesComponent,
    FriendRequestsComponent,
    FriendListComponent,
    ReserveEstateComponent,
    CurrentRoommateComponent,
    RoommateRequestsComponent,
    EventModalComponent,
    PasswordFormComponent,
    MessageModalComponent,
    ConversationItemComponent,
    ViewConversationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    LikedModalComponent,
    ViewMessagesComponent,
    ViewMessagesComponent,
    FriendRequestsComponent,
    FriendListComponent,
    ReserveEstateComponent,
    CurrentRoommateComponent,
    RoommateRequestsComponent,
    EventModalComponent,
    PasswordFormComponent,
    MessageModalComponent,
    ConversationItemComponent,
    ViewConversationComponent,
  ],
})
export class HelpersModule {}
