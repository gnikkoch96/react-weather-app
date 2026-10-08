import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://geocoding-api.open-meteo.com/v1/search?*",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          results: [
            {
              id: 5368361,
              name: "Los Angeles",
              latitude: 34.0522,
              longitude: -118.2437,
              country: "United States",
              admin1: "California",
              admin2: "Los Angeles County",
            },
          ],
        }),
      });
    },
  );
});

test("search location and view weather", async ({ page }) => {
  await page.goto("http://localhost:5173/weather");

  await page.getByLabel("Enter City:").fill("Los Angeles");

  await page.getByRole("button", { name: "Search Location" }).click();

  await expect(
    page.getByRole("dialog", { name: "Select Location" }),
  ).toBeVisible();

  await page
    .getByRole("dialog", { name: "Select Location" })
    .getByRole("list")
    .getByRole("button")
    .first()
    .click();

  await expect(page.getByText("Relative Humidity")).toBeVisible();
});

test("change settings on weather card", async ({ page }) => {
  // load weather card
  await page.goto("http://localhost:5173/weather");

  await page.getByLabel("Enter City:").fill("Los Angeles");

  await page.getByRole("button", { name: "Search Location" }).click();

  await expect(
    page.getByRole("dialog", { name: "Select Location" }),
  ).toBeVisible();

  await page
    .getByRole("dialog", { name: "Select Location" })
    .getByRole("list")
    .getByRole("button")
    .first()
    .click();

  await expect(page.getByText("Relative Humidity")).toBeVisible();

  // change settings
  await page.getByRole("button", { name: "Settings" }).click();
  await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();

  // change temperature
  await page
    .getByRole("dialog", { name: "Settings" })
    .getByLabel("Temperature Unit:")
    .selectOption("fahrenheit");

  // change speed
  await page
    .getByRole("dialog", { name: "Settings" })
    .getByLabel("Speed Unit:")
    .selectOption("mph");

  // click save
  await page.getByText("Save").click();

  // expect F
  await expect(page.getByText("°F")).toBeVisible();

  // expect mph
  await expect(page.getByText("mph")).toBeVisible();
});
