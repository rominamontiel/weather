import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoWeatherService {
  readonly API_BSAS_TEMP_AND_DAYRESUME =
    'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto';

  constructor(private http: HttpClient) {}

  public getWeather(ubi: { lat: number; long: number }): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ubi.lat}&longitude=${ubi.long}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    return this.http.get(url);
  }
}
