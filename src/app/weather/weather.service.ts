import { Injectable } from '@angular/core';

import { ICurrentWeather } from '../interfaces';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface IWeatherService {
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>
}

interface IcurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: string
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return this.http.get<IcurrentWeatherData>
      (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.appId}`).
      pipe(
        map(
          data => this.transformToICurrentWeather(data)
        ))
  }

  transformToICurrentWeather(data: IcurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
  }

  private convertKelvinToFahrenheit(kelvin: string): number {
    return (((parseInt(kelvin) * 9) / 5) - 459.67);
  }


}
