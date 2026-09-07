import { jest } from "@jest/globals";
import { searchLocations } from "../services/location.js";

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
});
