import { Component } from '@angular/core';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DatetimeService } from 'src/app/services/datetime.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  faUser = faUser;
  faPlus = faPlus;
  showCreateUserForm: boolean = false;

  constructor(
    private datetime: DatetimeService,
    private userService: UserService
  ) {}

  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  role: string = '';
  password: string = '';

  onChange(fieldName: string, event: any) {
    switch (fieldName) {
      case 'firstName':
        this.firstName = event.target.value;
        break;
      case 'lastName':
        this.lastName = event.target.value;
        break;
      case 'userName':
        this.userName = event.target.value;
        break;
      case 'role':
        this.role = event.target.value;
        break;
      case 'password':
        this.password = event.target.value;
        break;
    }
  }

  onSubmit() {
    console.log('submit');
    const data = {
      firstname: this.firstName,
      lastname: this.lastName,
      username: this.userName,
      role: this.role,
      password: this.password,
    };
    console.log(data)
    this.userService.register(data).subscribe((res) => {
      console.log(res);
    });
  }

  toggleCreateUserForm() {
    this.showCreateUserForm = !this.showCreateUserForm;
  }
}
