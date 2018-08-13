import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  current: ICurrentWeather = {
    city: '',
    country: '',
    date: 0,
    image: '',
    temperature: 0,
    description: ''
  };

  constructor(private weatherService: WeatherService,private route:ActivatedRoute) {
  }

  ngOnInit() {

    this.weatherService.getCurrentWeather('Bethesda', 'US').subscribe((res) => {
      this.current = res;
    });
  }

}
