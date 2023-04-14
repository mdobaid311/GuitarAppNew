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
  constructor(private chartData: ChartService, private router: Router) {}

  faSortDown = faSortDown;
  faSortUp = faSortUp;

  dataRows = [];

  loading = false;

  selectedYear = '';
  selectedMonth = '';
  selectedDay = '';

  currentYearTotal = 800000;

  currentYearTotalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.currentYearTotal);

  pickedYearTotal = 700000;

  pickedYearTotalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.pickedYearTotal);

  percentChange = (
    ((this.currentYearTotal - this.pickedYearTotal) / this.pickedYearTotal) *
    100
  ).toFixed(2);

  onSelectYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('selectedYear', this.selectedYear);
  }

  onSelectMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    console.log('selectedMonth', this.selectedMonth);
  }

  onSelectDayChange(event: any) {
    this.selectedDay = event.target.value;
    console.log('selectedDay', this.selectedDay);
  }

  ngOnInit(): void {
    this.chartData.getData().subscribe({
      next: (resp: any) => {
        this.dataRows = resp.rows;
        console.log('ROWS', this.dataRows);
      },
    });
  }

  barChartOptions = {
    text: 'New Bar Chart 1',
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: [
      {
        name: 'Cristiano Ronaldo',
        data: [4, 4, 6, 15, 12],
      },
      {
        name: 'Lionel Messi',
        data: [5, 3, 12, 6, 11],
      },
      {
        name: 'Kaka',
        data: [5, 3, 12, 6, 12],
      },
      {
        name: 'Robert Lewandowski',
        data: [5, 15, 8, 5, 8],
      },
    ],
  };
}
