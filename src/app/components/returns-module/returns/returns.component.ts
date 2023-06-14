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

  constructor(
    private returnsServices: ReturnsService,
    private calendar: NgbCalendar
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  returnsData: any;

  ngOnInit(): void {
    // this.loader = true;
    // this.returnsServices.getReturnsData('2023-03-22','2023-03-26').subscribe((res) => {
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
    console.log(date);
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
    console.log('date');
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

      this.loader = true;
      this.returnsServices
        .getReturnsData(beginDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
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

  onRangeSelect(range: any) {
    console.log('Range Selected', range);

    this.loader = true;

    if (range === '1m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.loader = true;
      this.returnsServices
        .getReturnsData(startDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
      this.fullDate = 'Last 1 Month';
    } else if (range === '2h' || range === '6h') {
      let startDate = '';
      let endDate = '';
      if (range === '2h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 Hours';
      } else if (range === '6h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 Hours';
      }
      this.loader = true;
      this.returnsServices
        .getReturnsData(startDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
    } else if (range === '12h' || range === '1d') {
      let startDate = '';
      let endDate = '';
      if (range === '12h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 Hours';
      } else if (range === '1d') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 Hours';
      }
      this.loader = true;
      this.returnsServices
        .getReturnsData(startDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.loader = true;
      this.returnsServices
        .getReturnsData(startDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
      this.fullDate = 'Last 6 Months';
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.loader = true;
      this.returnsServices
        .getReturnsData(startDate, endDate)
        .subscribe((res) => {
          console.log(res);
          this.returnsData = res;
          this.loader = false;
        });
      this.fullDate = 'Last 1 Year';
    }
  }
}
