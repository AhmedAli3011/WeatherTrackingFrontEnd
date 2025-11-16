import { Component, Input } from '@angular/core';
import Forecast from '../../Interfaces/Forecast';
import { KeyValuePipe } from '@angular/common';


@Component({
  selector: 'app-display',
  imports: [KeyValuePipe],
  templateUrl: './display.html',
  styleUrl: './display.css',
})
export class Display {
  @Input() forecastMap: Map<number,Forecast[]> = new Map();
  @Input() cityNameMap: Map<number, string> = new Map();
  @Input() isFahrenheit: boolean = false;

   
}
