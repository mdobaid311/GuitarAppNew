import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSitemap,
  faBars,
  faHome,
  faChartColumn,
  faUser,
  faMessage,
  faGear,
  faCashRegister,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  faSitemap = faSitemap;
  faBars = faBars;
  faHome = faHome;
  faChartColumn = faChartColumn;
  faUser = faUser;
  faMessage = faMessage;
  faGear = faGear;
  faCashRegister = faCashRegister;

  currentRoute: string;

  constructor(private router: Router) {
    console.log(this.router.url);
    this.currentRoute = this.router.url;
  }

  onHover() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  ngInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }
}
