import { Component } from '@angular/core';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DatetimeService } from 'src/app/services/datetime.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  faUser = faUser;
  faPlus = faPlus;
  showCreateUserForm: boolean = false;

  constructor(private datetime: DatetimeService) {}

  toggleCreateUserForm() {
    this.showCreateUserForm = !this.showCreateUserForm;
  }
}
