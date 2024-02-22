import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    if (!localStorage.getItem('logged')) {
      localStorage.setItem('logged', 'true');
      window.location.reload();
    }
  }
}
