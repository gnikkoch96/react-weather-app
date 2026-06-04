export type LocationData = {
  location: string;
};

export type WeatherData = {
  interval: number;
  is_day: number;
  relative_humidity: number;
  temperature: number;
  time: number;
  wind_speed: number;
  weather_code: number;
};

export type TemperatureUnit = 'fahrenheit' | 'celcius';

export type SpeedUnit = 'kmh' | 'm/s' | 'mph' | 'kn';