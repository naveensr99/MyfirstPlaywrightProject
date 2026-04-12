const{test,expect}=require('@playwright/test');
const { text } = require('node:stream/consumers');



test("Test to book for an event",async({browser})=>
{

    const context= await browser.newContext();
    const page=await context.newPage();
    const emailField=page.locator('#email');
    const passwordField=page.locator('#password');
    const loginBtn=page.locator("#login-btn");
    const browserEventLink=page.getByText("Browse Events →");

    const mangageEventsBtn=page.getByText("Manage Events");



    //this helps to genereate the a unique event title using test event
    const eventTitle = `Test Event ${Date.now()}`;


    await page.goto("https://eventhub.rahulshettyacademy.com");

    await emailField.fill("naveen123@gmail.com");
    await passwordField.fill("Kicha@4342");
    await loginBtn.click();

    await browserEventLink.waitFor();

    console.log(eventTitle);


    //logging is brwoserevent link is visible on the page
    console.log(await browserEventLink.isVisible());


    //Assertions link with text Browser events 
    await expect(browserEventLink).toBeVisible();



    await mangageEventsBtn.click();

    console.log(eventTitle);


    await page.pause();

});

