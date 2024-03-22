import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HelpersModule } from '../helpers/helpers.module';
import { OfferComponent } from './offer/offer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewEstateComponent } from './view-estate/view-estate.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MatInputModule } from '@angular/material/input';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    OfferComponent,
    AboutUsComponent,
    AdminComponent,
    ViewEstateComponent,
    ViewUserComponent,
    NotificationsComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HelpersModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBorderRadius: '4px',
    }),
  ],
  exports: [
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    NotificationsComponent,
  ],
})
export class PagesModule {}
