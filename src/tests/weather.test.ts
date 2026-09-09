import { jest } from "@jest/globals";
import type { SpeedUnit, TemperatureUnit } from "../../types/weather/types.js";

// Jest's ESM module mocking requires the mock to be registered before
// the module under test is imported. A dynamic import ensures searchLocations
// receives the mocked createAbortSignal instead of the real implementation.
const timeoutCleanup = jest.fn();

jest.unstable_mockModule("../utils/abort.js", () => ({
  createAbortSignal: jest.fn(() => ({
    signal: new AbortController().signal,
    timeoutCleanup,
  })),
}));

const { getWeather } = await import("../services/weather.js");

const weatherRequest = {
  coordinates: {
    latitude: 34.0522,
    longitude: -118.2437,
  },
  temperatureUnit: "celsius" as TemperatureUnit,
  speedUnit: "kmh" as SpeedUnit,
};

// test for zod error
test("handle malformed API data", async () => {
  const mockResponse = {
    results: [
      {
        time: 213, // should be a string
        interval: 1,
        temperature_2m: 32,
        relative_humidity_2m: 53,
        is_day: 0,
        wind_speed_10m: 13,
        weather_code: 4,
      },
    ],
  };

  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  await expect(
    getWeather(
      weatherRequest.coordinates,
      weatherRequest.temperatureUnit,
      weatherRequest.speedUnit,
    ),
  ).rejects.toThrow(
    "Something went wrong with fetching weather. Please try again later.",
  );

  expect(timeoutCleanup).toHaveBeenCalled();
});

test("handle aborted request", async () => {
  jest
    .spyOn(globalThis, "fetch")
    .mockRejectedValue(
      new DOMException("The operation was aborted.", "AbortError"),
    );

  await expect(
    getWeather(
      weatherRequest.coordinates,
      weatherRequest.temperatureUnit,
      weatherRequest.speedUnit,
    ),
  ).rejects.toThrow(
    "The weather request took too long and was canceled. Please try again.",
  );

  expect(timeoutCleanup).toHaveBeenCalled();
});

test("handle unexpected error", async () => {
  jest
    .spyOn(globalThis, "fetch")
    .mockRejectedValue(new Error());

  await expect(
    getWeather(
      weatherRequest.coordinates,
      weatherRequest.temperatureUnit,
      weatherRequest.speedUnit,
    ),
  ).rejects.toThrow("Something went wrong, please try again later.");

  expect(timeoutCleanup).toHaveBeenCalled();
});

test("successful weather data response", async () => {
  const mockResponse = {
    current: {
      time: "timestamp",
      interval: 1,
      temperature_2m: 32,
      relative_humidity_2m: 53,
      is_day: 0,
      wind_speed_10m: 13,
      weather_code: 4,
    },
  };

  const expectedResponse = {
    time: "timestamp",
    interval: 1,
    temperature: 32,
    relative_humidity: 53,
    is_day: 0,
    wind_speed: 13,
    weather_code: 4,
  };

  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  const weatherData = await getWeather(
    weatherRequest.coordinates,
    weatherRequest.temperatureUnit,
    weatherRequest.speedUnit,
  );

  expect(weatherData).toEqual(expectedResponse);
});

test("handle API error return status", async () => {
  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: false,
  } as Response);

  await expect(
    getWeather(
      weatherRequest.coordinates,
      weatherRequest.temperatureUnit,
      weatherRequest.speedUnit,
    ),
  ).rejects.toThrow(
    "Something went wrong when trying to reach the weather server. Please try again later.",
  );
});
