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

  await expect(page.getByText('Relative Humidity')).toBeVisible();
});
