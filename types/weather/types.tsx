export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type WeatherData = {
  interval: number;
  is_day: number;
  relative_humidity: number;
  temperature: number;
  time: string;
  wind_speed: number;
  weather_code: number;
};

export type TemperatureUnit = 'fahrenheit' | 'celsius';

export type SpeedUnit = 'kmh' | 'm/s' | 'mph' | 'kn';