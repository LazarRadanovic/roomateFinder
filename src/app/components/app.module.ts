import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
