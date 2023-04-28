import { Component } from '@angular/core';
import { faUser,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  faUser = faUser;
  faPlus = faPlus;
}
