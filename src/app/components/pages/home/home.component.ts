import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('logged')) {
      localStorage.setItem('logged', 'true');
      window.location.reload();
    }
  }
  navigateHome() {
    this.router.navigate(['/offer']);
  }
}
