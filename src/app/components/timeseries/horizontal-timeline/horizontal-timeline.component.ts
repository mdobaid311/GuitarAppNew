import { Component } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-horizontal-timeline',
  templateUrl: './horizontal-timeline.component.html',
  styleUrls: ['./horizontal-timeline.component.scss'],
})
export class HorizontalTimelineComponent {
  faClock = faClock;

  timelineSelectOptions = [
    { name: '1', icon: faClock },
    { name: '2', icon: faClock },
    { name: '3', icon: faClock },
    { name: '4', icon: faClock },
    { name: '5', icon: faClock },
  ];

  series = [
    {
      name: 'Booked',
      value: 10,
    },
    {
      name: 'Backordered',
      value: 0,
    },

    {
      name: 'Cancelled',
      value: 1,
    },
    {
      name: 'Store Resources',
      value: 0,
    },
    {
      name: 'Sent to DC',
      value: 5,
    },
    {
      name: 'Sent to Store',
      value: 0,
    },
    {
      name: 'Sent to Vendor',
      value: 0,
    },
    {
      name: 'DC to Customer',
      value: 2,
    },
    {
      name: 'DC to Store',
      value: 0,
    },
    {
      name: 'Store to Customer',
      value: 12,
    },
    {
      name: 'Store to Store',
      value: 0,
    },
    {
      name: 'Store - Store Pickup',
      value: 3,
    },
    {
      name: 'Ready for Pickup',
      value: 2,
    },
    {
      name: 'Customer Picked Up',
      value: 0,
    },
    {
      name: 'Returns',
      value: 1,
    },
  ];
}
