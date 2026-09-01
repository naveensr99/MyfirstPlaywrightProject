import { test, expect } from '@playwright/test';



test('simple WMS test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("[placeholder='User Name']");
    const password = page.locator("[placeholder='Password']");

    const LoginBtn=page.locator("[data-hj-test-id='actionButton']");    
    const menuSearchTxtBox=page.locator("[data-hj-test-id='menuSearchTextBox']");
    const menuToggle=page.locator('#menuButtonToggle');

    const InventoryMenu=page.getByText('Supply Chain Advantage');

    const kMotionAdvnatageDashboard=page.getByText('K.Motion Advantage Dashboard');

    const shippingBtn=page.getByText('Shipping');

    await page.goto('https://eclwatestweb.koerbercloud.com/core/Default.html');
    await username.fill('AUSERM24');
    await password.fill('HIGHSCORE');
    await LoginBtn.click();

    const pageTitle=await page.title();

    console.log(pageTitle);

    //Ecolab - Test
    await expect(page).toHaveTitle(pageTitle);
    await page.screenshot({path: 'screenshot.png'});

    await menuToggle.click();

    await menuSearchTxtBox.fill('Outbound order');
    await InventoryMenu.click();
    await kMotionAdvnatageDashboard.click();

    await shippingBtn.click();

    
    await page.getByText('Outbound Orders').filter({ hasText: 'Outbound Orders' }).click();

    // await page.getByText('Outbound Orders').nth(0).click();

    await page.pause();





});
