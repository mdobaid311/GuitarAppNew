import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';
import * as moment from 'moment';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
})
export class OrgChartComponent {
  // data: any;
  loader = false;

  constructor(private chartData: ChartService, calendar: NgbCalendar) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  data: any;

  ngOnInit() {
    this.loader = true;
    this.chartData.getOrgChartData().subscribe({
      next: (resp: any) => {
        const totalAmounts: any = {};
        resp.forEach(({ key, original_order_total_amount, children }: any) => {
          if (!totalAmounts[key]) {
            totalAmounts[key] = original_order_total_amount;
          } else {
            totalAmounts[key] += original_order_total_amount;
          }
          children.forEach(({ original_order_total_amount }: any) => {
            if (!totalAmounts[key]) {
              totalAmounts[key] = original_order_total_amount;
            } else {
              totalAmounts[key] += original_order_total_amount;
            }
          });
        });

        // Recursively calculate the width for each node
        const calculateWidth = (node: any, ancestorTotal: any) => {
          const { key, original_order_total_amount, children } = node;
          const width = (original_order_total_amount / ancestorTotal) * 100;
          const updatedNode = {
            ...node,
            width,
          };
          if (children.length > 0) {
            const updatedChildren = children.map((child: any) =>
              calculateWidth(child, ancestorTotal)
            );
            updatedNode.children = updatedChildren;
          }
          return updatedNode;
        };

        // Update each node with its width
        const updatedData = resp.map((topLevelNode: any) => {
          const ancestorTotal = totalAmounts[topLevelNode.key];
          return calculateWidth(topLevelNode, ancestorTotal);
        });
        this.data = this.generateNode(updatedData);
        this.loader = false;
      },
      error: (error) => {},
    });
  }

  generateNode(children: any) {
    return children.map((node: any) => {
      return {
        label: node.key || 'Others',
        type: 'person',
        styleClass: 'chart_node',
        expanded: true,
        data: {
          title: node.key || 'Others',
          width: node.width,
          value:
            '$' +
              Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(node.original_order_total_amount) || 0,
          color: this.generateRandomColorHex(),
        },
        children:
          node.children?.length > 0 ? this.generateNode(node.children) : [],
      };
    });
  }

  getOriginalOrderTotalForRoot(data: any) {
    const total = data.reduce((acc: any, curr: any) => {
      return acc + curr.original_order_total_amount;
    }, 0);
    return total;
  }

  expandNode(event: any) {
    console.log(event);
  }

  generateRandomColorHex(): string {
    const hexChars = '0123456789abcdef';
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
      hexColor += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hexColor;
  }

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  dayList = [];
  hourList = [];
  monthList = [];

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  onGlobalDateRangeChanged(date: NgbDate) {
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
      this.fullDate = beginDate + ' to ' + endDate;
      this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
        next: (resp: any) => {},
      });
    }
  }

  changeDate(value: any) {
    if (value === 'prev') {
      this.fullDate = moment(this.fullDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
    } else if (value === 'next') {
      this.fullDate = moment(this.fullDate).add(1, 'days').format('YYYY-MM-DD');
    }
  }

  onRangeSelect(range: any) {
    if (range === '1m') {
      const startDate = moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');
      console.log(startDate, endDate);

      this.getDataForRange(startDate, endDate);
    } else if (
      range === '2h' ||
      range === '6h' ||
      range === '12h' ||
      range === '1d'
    ) {
      let startDate = '';
      let endDate = '';
      if (range === '2h') {
        startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
      } else if (range === '6h') {
        startDate = moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
      } else if (range === '12h') {
        startDate = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
      } else if (range === '1d') {
        startDate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
      }
      console.log(startDate, endDate);
      this.getDataForRange(startDate, endDate);
    } else if (range === '6m') {
      const startDate = moment()
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');
      console.log(startDate, endDate);
      this.getDataForRange(startDate, endDate);
    } else if (range === '1y') {
      const startDate = moment()
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');
      console.log(startDate, endDate);
      this.getDataForRange(startDate, endDate);
    }
  }

  getDataForRange(startDate: any, endDate: any) {
    this.loader = true;
    // startDate='2015-01-01 00:00'&endDate='2023-01-31 01:00
    this.chartData.getOrgChartDataByRange(startDate, endDate).subscribe({
      next: (resp: any) => {
        const totalAmounts: any = {};
        resp.forEach(({ key, original_order_total_amount, children }: any) => {
          if (!totalAmounts[key]) {
            totalAmounts[key] = original_order_total_amount;
          } else {
            totalAmounts[key] += original_order_total_amount;
          }
          children.forEach(({ original_order_total_amount }: any) => {
            if (!totalAmounts[key]) {
              totalAmounts[key] = original_order_total_amount;
            } else {
              totalAmounts[key] += original_order_total_amount;
            }
          });
        });

        // Recursively calculate the width for each node
        const calculateWidth = (node: any, ancestorTotal: any) => {
          const { key, original_order_total_amount, children } = node;
          const width = (original_order_total_amount / ancestorTotal) * 100;
          const updatedNode = {
            ...node,
            width,
          };
          if (children.length > 0) {
            const updatedChildren = children.map((child: any) =>
              calculateWidth(child, ancestorTotal)
            );
            updatedNode.children = updatedChildren;
          }
          return updatedNode;
        };

        // Update each node with its width
        const updatedData = resp.map((topLevelNode: any) => {
          const ancestorTotal = totalAmounts[topLevelNode.key];
          return calculateWidth(topLevelNode, ancestorTotal);
        });
        this.data = this.generateNode(updatedData);
        this.loader = false;
      },
      error: (error) => {},
    });
  }
}
