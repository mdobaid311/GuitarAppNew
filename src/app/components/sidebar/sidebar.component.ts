import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  faTimeline,
  faMap,
  faRotateLeft,
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
  faMap = faMap;
  faRotateLeft = faRotateLeft;

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
      sub_menu: [
        {
          link_name: 'Home',
          link: '/dashboard',
          icon: faHome,
        },
      ],
    },
    {
      link_name: 'Sales',
      link: '/sales',
      icon: faCashRegister,
      sub_menu: [
        {
          link_name: 'Dashboard',
          link: '/sales',
          icon: faCashRegister,
        },
        {
          link_name: 'Analysis',
          link: '/area-chart',
          icon: faCashRegister,
        },
        {
          link_name: 'Flowchart',
          link: '/org-chart',
          icon: faSitemap,
        },
        {
          link_name: 'By Region',
          link: '/map',
          icon: faMap,
        },
      ],
    },
    {
      link_name: 'Timeseries',
      link: '/timeseries',
      icon: faTimeline,
      sub_menu: [
        {
          link_name: 'Milestones',
          link: '/timeseries-milestones',
          icon: faTimeline,
        },
        {
          link_name: 'Timeseries',
          link: '/timeseries',
          icon: faTimeline,
        },
      ],
    },
    {
      link_name: 'Returns',
      link: '/returns',
      icon: faRotateLeft,
      sub_menu: [
        {
          link_name: 'Returns',
          link: '/returns',
          icon: faRotateLeft,
        },
      ],
    },
    {
      link_name: 'Settings',
      link: '/settings',
      icon: faGear,
      sub_menu: [
        {
          link_name: 'Settings',
          link: '/settings',
          icon: faGear,
        },
      ],
    },
  ];

  isLoginPage: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/';
        // this.isLoginPage = event.url === '/login';
      }
    });
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }
}
