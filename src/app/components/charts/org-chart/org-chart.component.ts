import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';
import * as moment from 'moment';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCaretLeft,faMagnifyingGlassMinus, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
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

  faCaretLeft = faCaretLeft;
  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;

  data: any = [
    {
      key: 'Sales',
      original_order_total_amount: 802004864.56,
      children: [
        {
          key: 'GC',
          original_order_total_amount: 657261588.66,
          children: [
            {
              key: 'CallCenter',
              original_order_total_amount: 120735128.8,
              children: [],
            },
            {
              key: 'GCSTORE',
              original_order_total_amount: 257809712.88,
              children: [],
            },
            {
              key: 'Web',
              original_order_total_amount: 278715792.56,
              children: [],
            },
            {
              key: null,
              original_order_total_amount: 954.42,
              children: [],
            },
          ],
        },
        {
          key: 'MF',
          original_order_total_amount: 144743275.9,
          children: [
            {
              key: 'CallCenter',
              original_order_total_amount: 64018652.67,
              children: [],
            },
            {
              key: 'GCSTORE',
              original_order_total_amount: 76218.96,
              children: [],
            },
            {
              key: 'Web',
              original_order_total_amount: 80511277.86,
              children: [],
            },
            {
              key: null,
              original_order_total_amount: 137126.41,
              children: [],
            },
          ],
        },
      ],
    },
  ];

  ngOnInit() {
    this.getDataForRange('2023-05-05 00:00:00', '2023-05-05 23:59:59');
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
          width: Math.round(node.width),
          value:
            '$' +
              Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(node.original_order_total_amount) || 0,
          // color: this.generateRandomColorHex(),
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

  expandNode(event: any) {}

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
      this.getDataForRange(beginDate, endDate);
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
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

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
        startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      } else if (range === '6h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      } else if (range === '12h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      } else if (range === '1d') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      }
      this.getDataForRange(startDate, endDate);
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.getDataForRange(startDate, endDate);
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
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

  orgChartScale = 100;

  onZoom(event: any) {
    this.orgChartScale = 50 + +event.target.value;
    console.log(this.orgChartScale);
  }
}
