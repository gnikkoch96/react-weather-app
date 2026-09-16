import { test, expect } from "@playwright/test";

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
  await expect(page.getByText('°F')).toBeVisible();

  // expect mph
  await expect(page.getByText('mph')).toBeVisible();
});
