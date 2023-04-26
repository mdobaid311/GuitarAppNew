import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
})
export class OrgChartComponent {
  data: any;
  loader = false;

  constructor(private chartData: ChartService) {}

  ngOnInit() {
    this.loader = true;
    this.chartData.getOrgChartData().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.data = [
          {
            label: 'Sales',
            type: 'person',
            styleClass: 'chart_node',
            expanded: true,
            data: {
              name: 'Sales',
              title: 'Sales',
              gender: 'male',
            },
            children: this.generateNode(resp),
          },
        ];
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
        },
        children:
          node.children?.length > 0 ? this.generateNode(node.children) : [],
      };
    });
  }

  expandNode(event: any) {
    console.log(event);
  }
}
