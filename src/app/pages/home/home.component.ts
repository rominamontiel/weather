import { Component, OnInit } from '@angular/core';
import { OpenMeteoWeatherService } from 'src/app/services/open-meteo-weather.service';
import { OpenWeatherService } from 'src/app/services/open-wheater.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weather: any;
  city: string = '';
  temp: number = 0;
  icon: string = '';
  descr: string = '';
  hum: number = 0;
  wind: number = 0;
  windDeg: number = 0;
  st: number = 0;
  press: number = 0;
  wId: number = 0;
  clouds: number = 0;
  visibility: number = 0;
  currentDate = new Date();
  daysWeekName = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  monthsName = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  month = this.monthsName[this.currentDate.getMonth()];
  dayWeek = this.daysWeekName[this.currentDate.getDay()];
  day = this.currentDate.getDate();
  hour = this.currentDate.getHours();

  //---------------------------------------------------------------------

  temperature_2m: number[] = [];
  time: string[] = [];

  dailyPrecip: number[] = [];
  dailyTempMax: number[] = [];
  dailyTempMin: number[] = [];
  dailyCodeIcon: number[] = [];
  dailyTime: string[] = [];

  constructor(
    private openWeatherService: OpenWeatherService,
    private openMeteoWeather: OpenMeteoWeatherService
  ) {}

  ngOnInit(): void {
    this.getOpenWeatherData();
    this.getOpenMeteoWeatherData();
  }

  // ****************************************
  // ------------- OPEN WEATHER -------------
  // ****************************************

  getOpenWeatherData() {
    this.openWeatherService.getWeather().subscribe(
      (res) => {
        this.weather = res;
        // console.log(res);
        this.setData();
      },
      (err) => console.log(err)
    );
  }

  setData() {
    this.city = this.weather.name;
    this.temp = this.weather.main.temp.toFixed(0);
    this.icon = this.weather.weather[0].icon;
    this.descr = this.weather.weather[0].description;
    this.hum = this.weather.main.humidity;
    this.wind = this.weather.wind.speed.toFixed(0);
    this.windDeg = this.weather.wind.deg;
    this.st = this.weather.main.feels_like.toFixed(1);
    this.press = this.weather.main.pressure;
    this.wId = this.weather.weather[0].id;
    this.clouds = this.weather.clouds.all;
    this.visibility = this.weather.visibility;
  }

  currentSeason() {
    let season = '';

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;
    const day = this.currentDate.getDate();
    const today = new Date(year + '-' + month + '-' + day);
    // const today = new Date('2023-06-20'); //test

    const otoñoStart = new Date(year + '-03-21');
    const otoñoEnd = new Date(year + '-06-21');

    const inviernoStart = new Date(year + '-06-21');
    const inviernoEnd = new Date(year + '-09-21');

    const primaveraStart = new Date(year + '-09-21');
    const primaveraEnd = new Date(year + '-12-21');

    if (today >= otoñoStart && today < otoñoEnd) {
      season = 'otoño';
    } else if (today >= inviernoStart && today < inviernoEnd) {
      season = 'invierno';
    } else if (today >= primaveraStart && today < primaveraEnd) {
      season = 'primavera';
    } else {
      season = 'verano';
    }

    return season;
  }

  finalUrlImg(): string {
    let iconName = this.icon;

    if (this.icon == '10d') {
      iconName = '09d';
    }
    if (this.icon == '10n') {
      iconName = '09n';
    }

    if (this.icon.includes('13')) {
      return iconName;
    } else {
      return iconName + '_' + this.currentSeason();
    }
  }

  // ****************************************
  // ---------- OPEN METEO WEATHER ----------
  // ****************************************

  getOpenMeteoWeatherData() {
    this.openMeteoWeather.getWeather().subscribe((datos) => {
      console.log(datos);
      //Por hora
      this.temperature_2m = datos.hourly.temperature_2m;
      this.temperature_2m = this.temperature_2m.filter((e, i) => i % 2 == 0); //reduzco el tamaño a la mitad
      this.time = datos.hourly.time;
      this.time = this.time.filter((e, i) => i % 2 == 0);
      //Por día, 7 días
      this.dailyPrecip = datos.daily.precipitation_probability_max;
      this.dailyTempMax = datos.daily.temperature_2m_max;
      this.dailyTempMin = datos.daily.temperature_2m_min;
      this.dailyCodeIcon = datos.daily.weathercode;
      this.dailyTime = datos.daily.time;
    });
  }

  //-----------------------
  //-------- HORAS --------
  //-----------------------

  getMoment(i: number, array: any[]): string {
    const hour = new Date(array[i]);
    const hourPrev = new Date(array[i - 1]);
    let label = '';

    const year = hour.getFullYear();
    const month = hour.getMonth();
    const day = hour.getDate();

    const yearPrev = hourPrev.getFullYear();
    const monthPrev = hourPrev.getMonth();
    const dayPrev = hourPrev.getDate();

    if (year == yearPrev && month == monthPrev && day == dayPrev) {
      label = '';
    } else {
      label = day + ' ' + this.monthsName[month + 1].substring(0, 3);
    }

    return label;
  }

  getHour(i: number): number {
    const hour = new Date(this.time[i]);
    const label = hour.getHours();

    return label;
  }

  //-----------------------
  //-------- DÍAS ---------
  //-----------------------

  getIconDaily(n: number): string {
    let icon = '';
    switch (true) {
      case n == 0:
        icon = 'soleado';
        break;

      case n == 1:
        icon = 'poco_nublado';
        break;

      case n == 2:
        icon = 'medio_nublado';
        break;

      case n == 3:
        icon = 'nublado';
        break;

      case [61, 63, 65, 80, 81, 82].includes(n):
        icon = 'lluvia';
        break;

      case [56, 57].includes(n):
        icon = 'lluvia_sol';
        break;

      case [95, 96, 99].includes(n):
        icon = 'tormenta';
        break;

      case [45, 48].includes(n):
        icon = 'niebla';
        break;

      case [66, 67, 71, 73, 75, 77, 85, 86].includes(n):
        icon = 'nieve';
        break;

      default:
        break;
    }

    return icon;
  }
}
