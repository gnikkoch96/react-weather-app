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
    expect.stringContaining('los%20angeles'),
    expect.anything()
  );
});
