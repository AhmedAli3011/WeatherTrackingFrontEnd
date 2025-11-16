import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.html',
  styleUrl: './toggle.css',
})
export class Toggle {
  isFahrenheit: boolean = false;
  @Output() isFahrenheitChange = new EventEmitter<boolean>();

  toggleUnit() {
    this.isFahrenheit = !this.isFahrenheit;
    this.isFahrenheitChange.emit(this.isFahrenheit);
  }
}
