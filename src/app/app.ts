import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherDataService } from './Services/weather-data-service';
import { Toggle } from './Components/toggle/toggle';
import { Display } from './Components/display/display';
import { Search } from './Components/search/search';
import { DatePicker } from './Components/datePicker/datePicker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toggle, Display, Search, DatePicker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('weatherTrackingFrontEnd');
  protected readonly weatherService = inject(WeatherDataService);

  latestDate = signal('');
  idToCityNameMap = signal(new Map());
  ForecastMap = signal(new Map());
  isFahrenheit = signal(false);
  selectedCityId = signal(-1); // -1 indicates no city selected, show all
  selectedDate = signal('');

  error = '';

  constructor() { }

  ngOnInit() {
    this.weatherService.IntializeWeatherData().subscribe({
      next: (data) => {
        this.latestDate.set(data.latestDate);
        this.idToCityNameMap.set(data.cityNameMap);
        this.ForecastMap.set(data.latestForecastMap);
        this.selectedDate.set(this.latestDate());
      },
      error: (err) => {
        this.error = 'Failed to load weather data';
        console.error('Error loading weather data:', err);
      }
    });
  }

  onToggleUnit(newValue: boolean) {
    this.isFahrenheit.set(newValue);
  }

  onCitySelected(cityId: number) {
    this.weatherService.getForecastsByCity(cityId, this.selectedDate()).subscribe({
      next: (forecastMap) => {
        this.ForecastMap.set(forecastMap);
      },
      error: (err) => {
        this.error = 'Failed to load forecast data for selected city';
      }
    });
    this.selectedCityId.set(cityId);
    console.log('Selected city id:', cityId);
  }
  onDateSelected(date: string) {
    this.weatherService.getForecastsByDate(date, this.selectedCityId()).subscribe({
      next: (forecastMap) => {
        this.ForecastMap.set(forecastMap);
        this.selectedDate.set(date);

      },
      error: (err) => {
        this.error = 'Failed to load forecast data for selected date';
      }

    });
  }

}
