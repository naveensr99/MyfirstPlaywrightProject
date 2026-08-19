const { test, expect } = require('@playwright/test');


    

    // Helper function to set up the bowser context and navigate to the specified URL
    async function   loginAndGoToBooking(browser,url) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url); 

    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const loginBtn = page.locator("#login-btn");
    const browserEventLink = page.getByText("Browse Events →");
    


    await emailField.fill("naveen123@gmail.com");
    await passwordField.fill("Kicha@4342");
    await loginBtn.click();
    await browserEventLink.waitFor();
    expect (browserEventLink).toBeVisible();
    }


    test('Refund Eligibility Check', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        

        await loginAndGoToBooking(browser, 'https://eventhub.rahulshettyacademy.com');

    
        const eventsBtn= page.locator("[id='nav-events']");
        
        await eventsBtn.click();



        await page.waitForLoadState('networkidle');
        const eventCards= await page.locator("id='event-card'").filter({ hasText: "Book Now" });

        console.log("Total number of events displayed: " + await eventCards.count());










    });
