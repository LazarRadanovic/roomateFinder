import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cimer';
  isNotification = false;
  constructor(private router: Router) {}

  ngOnInit() {
    // Pratimo promjene ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Provjeravamo trenutnu rutu
        if (event.url !== '/notification') {
          this.isNotification = true; // Sakrijemo footer za sve rute osim 'notification'
        } else {
          this.isNotification = false; // Prikažemo footer za rutu 'notification'
        }
      }
    });
  }
}
