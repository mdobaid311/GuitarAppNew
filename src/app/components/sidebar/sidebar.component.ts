import { Component } from '@angular/core';
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

  currentRoute = 'home';

  changeRoute(route: string) {
    this.currentRoute = route;
  }
}
