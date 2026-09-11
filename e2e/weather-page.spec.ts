import { test, expect } from '@playwright/test';

test('search location and view weather', async({page}) => {
    await page.goto('http://localhost:5173/weather');
});