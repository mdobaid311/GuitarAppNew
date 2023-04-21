import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDateModel } from 'angular-mydatepicker';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  originalOrdersTotalToday: any;
  originalOrdersTotalTodayAbbr: any;

  yearData: any = [];
  dataRows = [];

  selectedChart = '';
  loader = false;

  showChangeModal = false;
  selectCompareYear: any;

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
    const begin = event.dateRange?.beginDate;
    const end = event.dateRange?.endDate;

    const beginDate = begin
      ? begin.year + '-' + begin.month + '-' + begin.day
      : null;
    const endDate = end ? end.year + '-' + end.month + '-' + end.day : null;

    this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.originalOrdersTotalToday = resp[0].original_orders_total;
        this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.originalOrdersTotalToday);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
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
      ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
      '%';
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
    this.chartData.getOrderTotalForRange('2023-01-31', '2023-01-31').subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.originalOrdersTotalToday = resp[0].original_orders_total;
        this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.originalOrdersTotalToday);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });

    this.chartData.getOrderTotalForRange('2023-01-30', '2023-01-30').subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.customGoal = resp[0].original_orders_total;
        this.customGoalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.customGoal);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });
  }

  onSelectChartChange(event: any) {
    this.selectedChart = event.target.value;
    console.log('selectedChart', this.selectedChart);
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
