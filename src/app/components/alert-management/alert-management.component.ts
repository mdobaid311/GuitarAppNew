import { Component } from '@angular/core';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DatetimeService } from 'src/app/services/datetime.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.scss'],
})
export class AlertManagementComponent {
  faUser = faUser;
  faPlus = faPlus;
  onChange(fieldName: string, event: any) {}

  onSubmit() {}
  user: any;
  showCreateAlertForm: boolean = false;
  showSchedularForm: boolean = true;

  constructor(
    private datetime: DatetimeService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  users: any;

  condition: string = '';
  alert_text: string = '';
  alert_name: string = '';
  sendEmail: string = '';
  sendSMS: string = '';

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  toggleCreateUserForm() {
    this.showSchedularForm = !this.showSchedularForm;
    this.showCreateAlertForm = !this.showCreateAlertForm;
  }
  toggleSchedularForm() {
    this.showCreateAlertForm = !this.showCreateAlertForm;
    this.showSchedularForm = !this.showSchedularForm;
  }

  conditionColumn: any;
  conditionOperator: any;

  showBetweenInputs: boolean = false;

  conditionColumnChange(event: any) {
    this.conditionColumn = event.target.value;
  }

  conditionOperatorChange(event: any) {
    this.conditionOperator = event.target.value;

    if (this.conditionOperator == 'between') {
      this.showBetweenInputs = true;
    } else {
      this.showBetweenInputs = false;
    }
  }


}
