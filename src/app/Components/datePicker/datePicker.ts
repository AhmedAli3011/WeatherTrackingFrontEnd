import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-date',
  imports: [],
  templateUrl: './datePicker.html',
  styleUrl: './datePicker.css',
})
export class DatePicker {
  @Input() latestDate: string = '';
  @Output() dateSelected = new EventEmitter<string>();
  selectedDate: string = this.latestDate;
  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.dateSelected.emit(this.selectedDate);
  }
}
