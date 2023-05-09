import {
  Component,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import { faChartLine, faAngleDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @Output() onSelectChartChange = new EventEmitter<string>();
  @Input() options: any[] = [];
  @Input() selectIcon: any;

  selectedOption: string = '';
  showOptions: boolean = false;

  faChartLine = faChartLine;
  faAngleDown = faAngleDown;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showOptions = false;
    }
  }
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.onSelectChartChange.emit(option);
    this.showOptions = false;
  }
}
