import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
})
export class OrgChartComponent {
  data = [
    {
      label: 'Sales',
      type: 'person',
      styleClass: 'chart_node',
      expanded: true,
      data: {
        name: 'John Doe',
        title: 'Sales',
        gender: 'male',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      children: [
        {
          label: 'CFO',
          type: 'person',
          styleClass: 'chart_node_1',
          expanded: false,
          data: {
            name: 'Jane Smith',
            title: 'CFO',
            gender: 'female',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
          },
          children: [
            {
              label: 'Accountant',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Bob Johnson',
                title: 'Accountant',
                gender: 'male',
                image: 'https://randomuser.me/api/portraits/men/2.jpg',
              },
            },
            {
              label: 'Finance Manager',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Mary Brown',
                title: 'Finance Manager',
                gender: 'female',
                image: 'https://randomuser.me/api/portraits/women/2.jpg',
              },
            },
          ],
        },
        {
          label: 'CTO',
          type: 'person',
          styleClass: 'chart_node_1',
          expanded: false,
          data: {
            name: 'Mark Lee',
            title: 'CTO',
            gender: 'male',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
          },
          children: [
            {
              label: 'Software Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Tom Wilson',
                title: 'Software Engineer',
                gender: 'male',
                image: 'https://randomuser.me/api/portraits/men/4.jpg',
              },
            },
            {
              label: 'QA Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Lisa Chen',
                title: 'QA Engineer',
                gender: 'female',
                image: 'https://randomuser.me/api/portraits/women/3.jpg',
              },
            },
          ],
        },
        {
          label: 'CTO',
          type: 'person',
          styleClass: 'chart_node_1',
          expanded: false,
          data: {
            name: 'Mark Lee',
            title: 'CTO',
            gender: 'male',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
          },
          children: [
            {
              label: 'Software Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Tom Wilson',
                title: 'Software Engineer',
                gender: 'male',
                image: 'https://randomuser.me/api/portraits/men/4.jpg',
              },
            },
            {
              label: 'QA Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: false,
              data: {
                name: 'Lisa Chen',
                title: 'QA Engineer',
                gender: 'female',
                image: 'https://randomuser.me/api/portraits/women/3.jpg',
              },
            },
          ],
        },
      ],
    },
  ];
  constructor(private chartData: ChartService) {}

  // ngOnInit() {
  //   this.chartData.getOrgChartData().subscribe({
  //     next: (resp: any) => {
  //       console.log(resp);
  //       this.data = [
  //         {
  //           label: 'Sales',
  //           type: 'person',
  //           styleClass: 'chart_node',
  //           expanded: true,
  //           data: {
  //             name: 'Sales',
  //             title: 'Sales',
  //             gender: 'male',
  //           },
  //           children: this.generateNode(resp),
  //         },
  //       ];
  //     },
  //   });
  // }

  generateNode(children: any) {
    return children.map((node: any) => {
      return {
        label: node.key || 'Others',
        type: 'person',
        styleClass: 'chart_node',
        expanded: false,
        data: {
          title: node.key || 'Others',
        },
        children:
          node.children.length > 0 ? this.generateNode(node.children) : [],
      };
    });
  }

  expandNode(event: any) {
    console.log(event);
  }
}
