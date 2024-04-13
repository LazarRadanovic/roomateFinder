import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OfferComponent } from './offer/offer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ViewEstateComponent } from './view-estate/view-estate.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdministrationUserComponent } from './administration-user/administration-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'event', component: AboutUsComponent },
  { path: `view-estate/:id`, component: ViewEstateComponent },
  { path: `view-user/:id`, component: ViewUserComponent },
  { path: 'notifaction', component: NotificationsComponent },
  { path: 'administration', component: AdministrationUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
