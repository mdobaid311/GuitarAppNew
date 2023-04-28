import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faChartLine, faAngleDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @Output() onSelectChartChange = new EventEmitter<string>();
  @Input() options: string[] = [];

  selectedOption: string = '';
  showOptions: boolean = false;

  faChartLine = faChartLine;
  faAngleDown = faAngleDown;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.onSelectChartChange.emit(option);
    this.showOptions = false;
  }
}
