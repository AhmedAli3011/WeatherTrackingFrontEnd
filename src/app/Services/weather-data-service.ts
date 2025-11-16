import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import City from '../Interfaces/City';
import Forecast from '../Interfaces/Forecast';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  http = inject(HttpClient);
  forecastApiUrl = 'http://localhost:4454/forecast'
  cityForecastApiUrl = 'http://localhost:4454/cityForecast'
  IntializeWeatherData(): Observable<{
    latestDate: string;
    cityNameMap: Map<number, string>;
    latestForecastMap: Map<number, Forecast[]>;
  }> {
    return this.http.get<City[]>(this.forecastApiUrl).pipe(
      map(cities => {
        //Get latest date from all forecasts
        const latestDate = cities
          .flatMap(c => c.forecast.map(f => f.date))
          .reduce((max, curr) => curr > max ? curr : max);
        //Get map of city id to city name
        const cityNameMap = new Map(
          cities.map(c => [c.id, c.city] as const)
        );
        //Get Intial forcast data for latest date as map of city id to forecast
        const latestForecastMap = new Map<number, Forecast[]>();
        cities.forEach(city => {
          const forecast = city.forecast.find(f => f.date === latestDate);
          if (forecast) {
            if (!latestForecastMap.has(city.id)) {
              latestForecastMap.set(city.id, []);
            }
            latestForecastMap.get(city.id)!.push(forecast);
          }
        });

        return {
          latestDate,
          cityNameMap,
          latestForecastMap
        };
      })
    );
  }

  getForecastsByCity(cityId: number, currentShownDate: string): Observable<Map<number, Forecast[]>> {
    if (cityId === -1) {
      // All cities
      return this.http.get<City[]>(this.forecastApiUrl).pipe(
        map(cities => {
          const result = new Map<number, Forecast[]>();
          cities.forEach(city => {
            if (currentShownDate === 'all') {
              result.set(city.id, city.forecast.slice());
            } else {
              const f = city.forecast.find(ff => ff.date === currentShownDate);
              if (f) result.set(city.id, [f]);
            }
          });
          return result;
        })
      );
    } else {
      // Single city
      return this.http.get<City>(`${this.cityForecastApiUrl}/${cityId}`).pipe(
        map(city => {
          const result = new Map<number, Forecast[]>();
          if (currentShownDate === 'all') {
            result.set(city.id, city.forecast);
          } else {
            const f = city.forecast.find(ff => ff.date === currentShownDate);
            if (f) result.set(city.id, [f]);
          }
          return result;
        })
      );
    }
  }

  getForecastsByDate(date: string, currentShownCityId: number): Observable<Map<number, Forecast[]>> {
    return this.http.get<City[]>(this.forecastApiUrl).pipe(
      map(cities => {
        const result = new Map<number, Forecast[]>();

        if (currentShownCityId === -1) {
          // All cities
          cities.forEach(city => {
            if (date === 'all') {
              // all dates for this city
              result.set(city.id, city.forecast.slice());
            } else {
              const f = city.forecast.find(ff => ff.date === date);
              if (f) result.set(city.id, [f]);
            }
          });
        } else {
          // Single city
          const city = cities.find(c => c.id === currentShownCityId);
          if (city) {
            if (date === 'all') {
              result.set(city.id, city.forecast);
            } else {
              const f = city.forecast.find(ff => ff.date === date);
              if (f) result.set(city.id, [f]);
            }
          }
        }

        return result;
      })
    );
  }
}
