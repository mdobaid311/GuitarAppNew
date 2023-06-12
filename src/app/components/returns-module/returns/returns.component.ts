import { Component } from '@angular/core';
import { ReturnsService } from 'src/app/services/returns.service';
import data from './data.json';
import moment from 'moment';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent {
  loader = false;

  constructor(private returnsServices: ReturnsService,
     private  calendar: NgbCalendar) {
      this.globalFromDate = calendar.getToday();
      this.globalToDate = calendar.getToday();
     }

  returnsData: any;

  ngOnInit(): void {
    // this.loader = true;
    // this.returnsServices.getReturnsData('2023-03-22').subscribe((res) => {
    //   console.log(res);
    //   this.returnsData = res;
    //   this.loader = false;
    // });

    this.returnsData = data;
  }

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  fullSalesData: any;


  onGlobalDateRangeChanged(date: NgbDate) {
    console.log(date)
    if (!this.globalFromDate && !this.globalToDate) {
      this.globalFromDate = date;
    } else if (
      this.globalFromDate &&
      !this.globalToDate &&
      date.after(this.globalFromDate)
    ) {
      this.globalToDate = date;
    } else {
      this.globalToDate = null;
      this.globalFromDate = date;
    }
    console.log("date")
    const beginDate =
      this.globalFromDate.year +
      '-' +
      this.globalFromDate.month +
      '-' +
      this.globalFromDate.day;
    const endDate = this.globalToDate
      ? this.globalToDate.year +
        '-' +
        this.globalToDate.month +
        '-' +
        this.globalToDate.day
      : null;
    if (beginDate && endDate) {
      this.fullDate =
        moment(beginDate, 'YYYY-M-DD').format('MMM DD YYYY') +
        ' , ' +
        moment(endDate, 'YYYY-M-DD').format('MMM DD YYYY');

      console.log(this.fullDate);
    }
  }

  changeDate(value: any) {
    if (value === 'prev') {
      this.fullDate = moment(this.fullDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

      // this.getAllData(this.fullDate);
    } else if (value === 'next') {
      this.fullDate = moment(this.fullDate).add(1, 'days').format('YYYY-MM-DD');
      // this.getAllData(this.fullDate);
    }
  }

  onRangeSelect(event: any) {
    console.log(event);
  }
}
