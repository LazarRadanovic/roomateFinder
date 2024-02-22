import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LikedModalComponent } from './liked-modal/liked-modal.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    LikedModalComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    LikedModalComponent,
  ],
})
export class HelpersModule {}
