import { Component, ElementRef, HostListener } from '@angular/core';
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
  faChevronDown,
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
  faChevronDown = faChevronDown;

  // currentRoute: string;

  // constructor(private router: Router) {
  //   console.log(this.router.url);
  //   this.currentRoute = this.router.url;
  // }

  // onHover() {
  //   setTimeout(() => {
  //     // console.log("sidebar onHover() setTimeout(() => {")
  //     window.dispatchEvent(new Event('resize'));
  //   }, 500);
  // }

  // ngOnInit() {
  //   setTimeout(() => {
  //     window.dispatchEvent(new Event('resize'));
  //   }, 500);
  // }
  openSidebar: boolean = false;

  expandSidebar() {
    console.log('open sidebar');
    this.openSidebar = !this.openSidebar;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.openSidebar = false;
    }
  }

  menuSidebar = [
    {
      link_name: 'Dashboard',
      link: '/dashboard',
      icon: faHome,
      sub_menu: [],
    },
    {
      link_name: 'Sales',
      link: '/sales',
      icon: faCashRegister,
      sub_menu: [
        {
          link_name: 'Detail View',
          link: '/area-chart',
          icon: faCashRegister,
        },
        {
          link_name: 'Org Chart',
          link: '/org-chart',
          icon: faSitemap,
        },
        {
          link_name: 'Org Chart 2',
          link: '/org-chart-1',
          icon: faSitemap,
        },
      ],
    },
    {
      link_name: 'Settings',
      link: '/settings',
      icon: faGear,
      sub_menu: [],
    },
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }
}
