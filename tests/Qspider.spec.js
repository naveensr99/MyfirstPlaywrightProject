const { test, expect } = require('@playwright/test');

test('Launching Qspider application', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/');

  await expect(page).toHaveTitle('DemoApps | Qspiders');

  const title= await page.title();
  console.log(title);




  page.pause();
  
});
