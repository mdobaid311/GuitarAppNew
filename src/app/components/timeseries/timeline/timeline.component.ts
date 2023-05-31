import { Component } from '@angular/core';
import { faClock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  constructor() {}

  faClock = faClock;

  timelineSelectOptions = [
    { name: '1', icon: faClock },
    { name: '2', icon: faClock },
    { name: '3', icon: faClock },
    { name: '4', icon: faClock },
    { name: '5', icon: faClock },
  ];
}
