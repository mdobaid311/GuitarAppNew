import { Component } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent {
  faBell = faBell;
  constructor() { }

}
