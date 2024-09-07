import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
      },
      {
        label: 'Reservations',
        icon: 'pi pi-fw pi-home',
        routerLink: '/reservations',
      },
      { label: 'Services', icon: 'pi pi-fw pi-info', routerLink: '/services' },
    ];
  }
}
