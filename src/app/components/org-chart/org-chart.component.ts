import { Component } from '@angular/core';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent {

  data = [
    {
      label: 'CEO',
      type: 'person',
      styleClass: 'chart_node',
      expanded: true,
      data: { name: 'John Doe', title: 'CEO', gender: 'male', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
      children: [
        {
          label: 'CFO',
          type: 'person',
          styleClass: 'chart_node_1',
          expanded: true,
          data: { name: 'Jane Smith', title: 'CFO', gender: 'female', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
          children: [
            {
              label: 'Accountant',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: true,
              data: { name: 'Bob Johnson', title: 'Accountant', gender: 'male', image: 'https://randomuser.me/api/portraits/men/2.jpg' }
            },
            {
              label: 'Finance Manager',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: true,
              data: { name: 'Mary Brown', title: 'Finance Manager', gender: 'female', image: 'https://randomuser.me/api/portraits/women/2.jpg' }
            }
          ]
        },
        {
          label: 'CTO',
          type: 'person',
          styleClass: 'chart_node_1',
          expanded: true,
          data: { name: 'Mark Lee', title: 'CTO', gender: 'male', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
          children: [
            {
              label: 'Software Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: true,
              data: { name: 'Tom Wilson', title: 'Software Engineer', gender: 'male', image: 'https://randomuser.me/api/portraits/men/4.jpg' }
            },
            {
              label: 'QA Engineer',
              type: 'person',
              styleClass: 'chart_node_2',
              expanded: true,
              data: { name: 'Lisa Chen', title: 'QA Engineer', gender: 'female', image: 'https://randomuser.me/api/portraits/women/3.jpg' }
            }
          ]
        }
      ]
    }
  ];

}
