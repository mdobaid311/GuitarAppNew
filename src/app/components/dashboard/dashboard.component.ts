import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartData.service';
import { Router } from '@angular/router';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { IMyDateModel } from 'angular-mydatepicker';

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

  yearList = [];
  monthList: {
    monthNumber: number;
    monthName: string;
  }[] = [];
  dayList = [];
  hourList = [];

  customGoal = 32998000;
  customGoalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.customGoal);
  customGoalProgress: any;

  isEditable: boolean = false;
  makeEditable() {
    this.isEditable = true;
  }
  constructor(private chartData: ChartService, private router: Router) {}

  onDateChanged(event: IMyDateModel) {
    const start_date =
      event.dateRange?.beginDate?.year +
      '-' +
      event.dateRange?.beginDate?.month +
      '-' +
      event.dateRange?.beginDate?.day;

    const end_date =
      event.dateRange?.endDate?.year +
      '-' +
      event.dateRange?.endDate?.month +
      '-' +
      event.dateRange?.endDate?.day;

    this.chartData.getOrderTotalForRange('2023-01-21', '2023-01-31').subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
      },
    });
  }

  makeNonEditable() {
    this.isEditable = false;
  }

  setCustomGoal(event: any) {
    this.customGoal = event.target.value;
    this.customGoalAbbr = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(this.customGoal);
    this.customGoalProgress =
      ((this.originalOrdersTotal / this.customGoal) * 100).toFixed(1) + '%';
  }

  toggleChangeModal() {
    this.showChangeModal = !this.showChangeModal;
    console.log('showChangeModal', this.showChangeModal);
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
    console.log('selectCompareYear', this.selectCompareYear);
  }

  ngOnInit(): void {
    this.chartData.getData(2023).subscribe({
      next: (resp: any) => {
        this.originalOrdersTotal = resp[0].original_orders_total;
        this.originalOrdersTotalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.originalOrdersTotal);
        this.customGoalProgress =
          ((this.originalOrdersTotal / this.customGoal) * 100).toFixed(1) + '%';
      },
    });
    this.chartData.getData(2022).subscribe({
      next: (resp: any) => {
        this.currentYearTotal = resp[0].original_orders_total;
        this.currentYearTotalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.currentYearTotal);
      },
    });
    this.chartData.getData(2021).subscribe({
      next: (resp: any) => {
        this.pickedYearTotal = resp[0].original_orders_total;
        this.pickedYearTotalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.pickedYearTotal);
        this.percentChange =
          ((this.currentYearTotal - this.pickedYearTotal) /
            this.pickedYearTotal) *
          100;
      },
    });
  }

  onSelectYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('selectedYear', this.selectedYear);
    this.loader = true;

    this.chartData.getOrderTotalForYear(this.selectedYear).subscribe({
      next: (resp: any) => {
        this.yearData = [];
        console.log('Year data', resp);
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        this.monthList = resp.map((item: any) => {
          return {
            monthNumber: monthNames.indexOf(item.monthName) + 1,
            monthName: item.monthName,
          };
        });
        console.log('monthList', this.monthList);
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
          this.dayList = resp.map((item: any) => item.day);
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
          this.hourList = resp.map((item: any) => item.hour);
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
