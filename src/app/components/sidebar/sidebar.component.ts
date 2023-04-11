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

  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }
}
