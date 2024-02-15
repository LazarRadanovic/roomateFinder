import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  HttpClientModule,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { PagesModule } from './pages/pages.module';
import { HelpersModule } from './helpers/helpers.module';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HelpersModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [provideHttpClient(withFetch()), SharedService], // Use provideHttpClient here
  bootstrap: [AppComponent],
})
export class AppModule {}
