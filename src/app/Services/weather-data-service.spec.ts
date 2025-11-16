import { TestBed } from '@angular/core/testing';

import { WeatherDataService } from './weather-data-service';

describe('WeatherApiService', () => {
  let service: WeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
