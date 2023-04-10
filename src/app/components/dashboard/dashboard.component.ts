import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartData.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  dataRows = []

  constructor(private chartData: ChartService){}

  ngOnInit(): void {
      this.chartData.getData().subscribe({
        next: (resp:any) => {
          this.dataRows = resp.rows
          console.log('ROWS', this.dataRows)
        }
      })
  }

  barChartOptions = {
    text: "New Bar Chart 1",
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: [{
      name: 'Cristiano Ronaldo',
      data: [4, 4, 6, 15, 12]
    }, {
      name: 'Lionel Messi',
      data: [5, 3, 12, 6, 11]
    }, {
      name: 'Kaka',
      data: [5, 3, 12, 6, 12]
    }, {
      name: 'Robert Lewandowski',
      data: [5, 15, 8, 5, 8]
    }]
  }
}
