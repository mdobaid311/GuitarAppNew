import { Component } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {
  faCalendar,
  faSliders,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-daterange-picker',
  templateUrl: './custom-daterange-picker.component.html',
  styleUrls: ['./custom-daterange-picker.component.scss'],
})
export class CustomDaterangePickerComponent {
  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  hoveredDate: NgbDate | null = null;

  faCalendar = faCalendar;
  faSliders = faSliders;
  faClockRotateLeft = faClockRotateLeft;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  divName = 'range';
  datePickerVisible = false;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  selected: Date | null | any;
  choosedDate(e: any) {}

  changeSection(num: any) {
    this.divName = num;
  }
  setDatePickerVisible() {
    this.datePickerVisible = !this.datePickerVisible;
  }
}
