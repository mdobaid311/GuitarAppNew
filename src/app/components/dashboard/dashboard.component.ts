import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartData.service';
import { Router } from '@angular/router';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  originalOrdersTotal: any;
  originalOrdersTotalAbbr: any;
  currentYearTotal: any;
  currentYearTotalAbbr: any;
  pickedYearTotal: any;
  pickedYearTotalAbbr: any;
  percentChange: any;
  faSortDown = faSortDown;
  faSortUp = faSortUp;

  yearData: any = [];
  dataRows = [];

  loading = false;

  selectedYear = '';
  selectedMonth = '';
  selectedDay = '';
  loader = false;

  showChangeModal = false;
  selectCompareYear: any;

  customGoal = 7;
  isEditable: boolean = false;

  makeEditable() {
    this.isEditable = true;
  }

  makeNonEditable() {
    this.isEditable = false;
  }

  setCustomGoal(event:any) {
    this.customGoal = event.target.value;
    console.log(this.customGoal)
  }

  toggleChangeModal() {
    this.showChangeModal = !this.showChangeModal;
    console.log('showChangeModal', this.showChangeModal);
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
    console.log('selectCompareYear', this.selectCompareYear);
  }

  constructor(private chartData: ChartService, private router: Router) {
    console.log('first');
  }

  ngOnInit(): void {
    // this.chartData.getData(2021).subscribe({
    //   next: (resp: any) => {
    //     this.originalOrdersTotal = resp[0].original_orders_total;
    //     this.originalOrdersTotalAbbr = Intl.NumberFormat('en-US', {
    //       notation: 'compact',
    //       compactDisplay: 'short',
    //     }).format(this.originalOrdersTotal);
    //   },
    // });
    // this.chartData.getData(2020).subscribe({
    //   next: (resp: any) => {
    //     this.currentYearTotal = resp[0].original_orders_total;
    //     this.currentYearTotalAbbr = Intl.NumberFormat('en-US', {
    //       notation: 'compact',
    //       compactDisplay: 'short',
    //     }).format(this.currentYearTotal);
    //   },
    // });
    // this.chartData.getData(2019).subscribe({
    //   next: (resp: any) => {
    //     this.pickedYearTotal = resp[0].original_orders_total;
    //     this.pickedYearTotalAbbr = Intl.NumberFormat('en-US', {
    //       notation: 'compact',
    //       compactDisplay: 'short',
    //     }).format(this.pickedYearTotal);
    //     this.percentChange =
    //       ((this.currentYearTotal - this.pickedYearTotal) /
    //         this.pickedYearTotal) *
    //       100;
    //   },
    // });
  }

  onSelectYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('selectedYear', this.selectedYear);
    this.loader = true;

    this.chartData.getOrderTotalForYear(this.selectedYear).subscribe({
      next: (resp: any) => {
        this.yearData = [];
        console.log('Year data', resp);
        resp.forEach((item: IItem) => {
          const itemData = [item.monthName, item.total];
          this.yearData.push(itemData);
        });
        console.log('yearDATA', this.yearData);
        this.chartData.dataArray.next(this.yearData);
        this.loader = false;
      },
    });
  }

  onSelectMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    console.log('selectedMonth', this.selectedMonth);

    this.loader = true;

    this.chartData
      .getOrderTotalByDay(this.selectedYear, this.selectedMonth)
      .subscribe({
        next: (resp: any) => {
          let monthData: any = [];
          console.log('month Data', resp);
          resp.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            monthData.push(itemData);
          });
          console.log('New month data', monthData);
          this.chartData.dataArray.next(monthData);
          this.loader = false;
        },
      });
  }

  onSelectDayChange(event: any) {
    this.selectedDay = event.target.value;
    console.log('selectedDay', this.selectedDay);
    this.loader = true;

    this.chartData
      .getOrderTotalByHour(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      )
      .subscribe({
        next: (resp: any) => {
          let hourData: any = [];
          console.log('hour Data', resp);
          resp.forEach((item: IHour) => {
            const itemData = [item.hour, item.total];
            hourData.push(itemData);
          });
          console.log('New month data', hourData);
          this.chartData.dataArray.next(hourData);
          this.loader = false;
        },
      });
  }

  barChartOptions = {
    text: 'New Bar Chart 1',
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: this.yearData,
  };
}

class IItem {
  'monthName': string;
  'total': number;
}

class IDay {
  'day': string;
  'total': number;
}

class IHour {
  'hour': string;
  'total': number;
}
