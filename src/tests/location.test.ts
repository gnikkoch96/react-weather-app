import { jest } from "@jest/globals";

const timeoutCleanup = jest.fn();

jest.unstable_mockModule("../utils/abort.js", () => ({
  createAbortSignal: jest.fn(() => ({
    signal: new AbortController().signal,
    timeoutCleanup,
  })),
}));

const { searchLocations } = await import("../services/location.js");

beforeEach(() => {
  timeoutCleanup.mockClear();
});

test("makes a correctly formatted request when searching for a city", async () => {
  const mockResponse = {
    results: [],
  };

  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  await searchLocations(" Los Angeles ");

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("los%20angeles"),
    expect.anything(),
  );
});

test("handle malformed API data", async () => {
  const mockResponse = {
    results: [
      {
        id: "not-a-number",
        name: "Los Angeles",
        latitude: 34,
        longitude: -118,
      },
    ],
  };

  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  await expect(searchLocations("Los Angeles")).rejects.toThrow(
    "Something went wrong with fetching location. Please try again later.",
  );

  expect(timeoutCleanup).toHaveBeenCalled();
});

test("successfully returned LocationData", async () => {
  const mockResponse = {
    results: [
      {
        id: 123,
        name: "Los Angeles",
        latitude: 34,
        longitude: -118,
        country: "United States",
        admin1: "California",
        admin2: "Los Angeles County",
      },
    ],
  };

  const expectedLocationData = [
    {
      id: 123,
      name: "Los Angeles",
      latitude: 34,
      longitude: -118,
      country: "United States",
      state: "California",
      county: "Los Angeles County",
    },
  ];

  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  const locationData = await searchLocations("Los Angeles");
  expect(locationData).toEqual(expectedLocationData);
  expect(timeoutCleanup).toHaveBeenCalled();
});

test("handles an aborted request", async () => {
  jest
    .spyOn(globalThis, "fetch")
    .mockRejectedValue(
      new DOMException("The operation was aborted.", "AbortError"),
    );

  await expect(searchLocations("Los Angeles")).rejects.toThrow(
    "The location request took too long and was canceled. Please try again.",
  );

  expect(timeoutCleanup).toHaveBeenCalled();
});

test("handle unexpected error", async () => {
  jest
    .spyOn(globalThis, "fetch")
    .mockRejectedValue(new Error("Unexpected error occurred"));

  await expect(searchLocations("Los Angeles")).rejects.toThrow(
    "Something went wrong, please try again later.",
  );
  expect(timeoutCleanup).toHaveBeenCalled();
});
