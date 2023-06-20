import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  public urlFinal: string = '';

  constructor(private http: HttpClient) {
    this.urlFinal =
      'https://api.openweathermap.org/data/2.5/weather?id=3435910&APPID=1cfb29ce4e3aad2ae9d36137ee17f3e7&lang=es&units=metric';
  }

  public getWeather() {
    return this.http.get(`${this.urlFinal}`);
  }
}
