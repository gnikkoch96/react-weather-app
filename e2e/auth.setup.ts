import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  // go to login page
  await page.goto("http://localhost:5173/weather");

  if (page.url() === "http://localhost:5173/") {
    // find email input and fill in data
    await page.getByLabel("E-MAIL ADDRESS").fill("user1@email.com");

    // find password input and fill in data
    await page.getByLabel("PASSWORD").fill("password");

    // find and click on the login button
    await page.getByRole("button", { name: "LOG IN" }).click();

    // verify that login succeeded
    await expect(page).toHaveURL("http://localhost:5173/weather");
  }

  // save the logged-in browser state
  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
