import { KeyValuePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [KeyValuePipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  @Input() idToCityNameMap: Map<number, string> = new Map();
  @Output() citySelected = new EventEmitter<number>();
  selectedCityId: number | null = -1;

  onCityChange(event: any) {
    const value = Number(event.target.value);
    this.selectedCityId = isNaN(value) ? -1 : value;
    this.citySelected.emit(this.selectedCityId);
  }
}
