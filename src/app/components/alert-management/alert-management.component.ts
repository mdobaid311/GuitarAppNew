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

  scheduleFields: any = {};

  onScheduleFieldsChange(fieldName: string, event: any) {
    console.log(this.scheduleFields);
    this.scheduleFields[fieldName] = event.target.value;
    console.log(this.scheduleFields);
  }

  savedQueryChange(event: any) {
    this.savedQuerySelect = event.target.value;
    this.scheduleFields['query'] = this.savedQuerySelect;
    console.log(this.scheduleFields);
    if (this.savedQuerySelect == 'custom') {
      this.showCustomQuery = true;
    } else {
      this.showCustomQuery = false;
    }
  }

  onScheduleSubmit() {
    const userid = this.user.id;

    const data = {
      ...this.scheduleFields,
      userid,
      day: null,
      month: null,
      year: null,
      timezone: 'Asia/Kolkata',
    };

    this.userService.scheduleQuery(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Query Scheduled Successfully');
    });

    console.log(data);
  }

  onSubmit() {}
  user: any;
  showCreateAlertForm: boolean = false;
  showSchedularForm: boolean = true;

  frequency: string = '';
  optionsArray: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  onFrequencyChange(event: any) {
    this.frequency = event.target.value;
    console.log(this.frequency);
  }

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

  userQueriesData: any;

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.userService.getUserConfigurationData(69).subscribe((res: any) => {
      this.userQueriesData = res.queriesData;
      console.log(this.userQueriesData);
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

  savedQuerySelect: any = '';

  showCustomQuery: boolean = false;
}
