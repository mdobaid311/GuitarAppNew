import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';
import * as moment from 'moment';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {
  faCaretLeft,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-orgchart3',
  templateUrl: './orgchart3.component.html',
  styleUrls: ['./orgchart3.component.scss'],
})
export class Orgchart3Component {
  // data: any;
  loader = false;

  constructor(private chartData: ChartService, calendar: NgbCalendar) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  faCaretLeft = faCaretLeft;
  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;

  activeType = 'fulfillment';

  startDate: any = '2023-05-05 00:00:00';
  endDate: any = '2023-05-05 23:59:59';

  changeType(type: string) {
    this.activeType = type;
    this.getDataForRange(this.startDate, this.endDate, type);
  }

  data: any;

  nodes: any = [
    {
      name: 'Sales',
      title: 802004864.5599998,
      cssClass: 'ngx-org-ceo',
      childs: [
        {
          name: 'GC',
          title: 657261588.6599998,
          cssClass: 'ngx-org-ceo',
          childs: [
            {
              name: 'Clearance-Sale',
              title: 54506.65,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'COA-Credit',
              title: 2541384.23,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Digital-Download',
              title: 957610.51,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Free-Gift-Item',
              title: 1058661.2,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'GC-Gift-Card',
              title: 19221.78,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Lessons',
              title: 21007908.24,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Low-Value-Sale',
              title: 64251634.05,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Registration',
              title: 3554077.1,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Regular',
              title: 449300077.81,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Used-And-Vintage',
              title: 64567398.37,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Vendor-Fulfilled',
              title: 460480.28,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Warranty',
              title: 49488628.44,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
          ],
        },
        {
          name: 'MF',
          title: 144743275.89999998,
          cssClass: 'ngx-org-ceo',
          childs: [
            {
              name: 'Digital-Download',
              title: 238104.77,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'E-Certificate',
              title: 110052.73,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Free-Gift-Item',
              title: 317073.2,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Low-Value-Sale',
              title: 24168349.74,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Regular',
              title: 110563597.07,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Used-And-Vintage',
              title: 7045550.89,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Vendor-Fulfilled',
              title: 248136.26,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
            {
              name: 'Warranty',
              title: 2052411.24,
              cssClass: 'ngx-org-ceo',
              childs: [],
            },
          ],
        },
      ],
    },
  ];

  ngOnInit() {

    const total = this.nodes[0].title

    this.nodes.forEach((node: any) => {
      node.percentage = ((node.title / total) * 100).toFixed(2);
      node.title = Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(+node.title);
      node.title = node.title + ' (' + node.percentage + '%)';
      node.childs.forEach((child: any) => {
        child.percentage = ((child.title / total) * 100).toFixed(2);
        child.title = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(+child.title);
        child.title = child.title + ' (' + child.percentage + '%)';
        child.childs.forEach((child2: any) => {
          child2.percentage = ((child2.title / total) * 100).toFixed(2);
          child2.title = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(+child2.title);
          child2.title = child2.title + ' (' + child2.percentage + '%)';
        });
      });
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
          width: Math.round(node.width),
          value: node.original_order_total_amount,
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
      this.getDataForRange(beginDate, endDate, this.activeType);
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

      this.getDataForRange(startDate, endDate, this.activeType);
    } else if (
      range === '2h' ||
      range === '6h' ||
      range === '12h' ||
      range === '1d'
    ) {
      if (range === '2h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 hours';
      } else if (range === '6h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 hours';
      } else if (range === '12h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 hours';
      } else if (range === '1d') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 hours';
      }
      this.getDataForRange(this.startDate, this.endDate, this.activeType);
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.fullDate = 'Last 6 months';
      this.getDataForRange(startDate, endDate, this.activeType);
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.fullDate = 'Last 12 months';
      this.getDataForRange(startDate, endDate, this.activeType);
    }
  }

  getDataForRange(startDate: any, endDate: any, type: any) {
    this.loader = true;
    // startDate='2015-01-01 00:00'&endDate='2023-01-31 01:00
    this.chartData.getOrgChartDataByRange(startDate, endDate, type).subscribe({
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
  }
}
