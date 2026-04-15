const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');



test("Test to book for an event", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const loginBtn = page.locator("#login-btn");
    const browserEventLink = page.getByText("Browse Events →");

    const eventTitletxtfld = page.locator('#event-title-input');
    const categorySelectId = page.locator('#category');
    const cityTxtfld = page.locator('#city');
    const venueTxtfld = page.locator('#venue');
    const eventdateandTime = page.getByLabel('Event Date & Time');
    const priceTxtfld = page.getByLabel('Price ($)');
    const totalSeatstxtfld = page.locator('#total-seats');
    const addEventBtn = page.getByText('+ Add Event');

    const eventCreatedMsg=page.getByText('Event created!');



    const mangageEventsBtn = page.getByText("Manage Events");

    //future date helper
    function getFutureDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }


    const futureDate = getFutureDate(5);
    const futureDatesplit=futureDate.split('-');
    const dates=futureDatesplit[1]+futureDatesplit[2]+'00'+futureDatesplit[0]+'1212PM';
    



    //this helps to genereate the a unique event title using test event
    const eventTitle = `Test Event ${Date.now()}`;


    await page.goto("https://eventhub.rahulshettyacademy.com");

    await emailField.fill("naveen123@gmail.com");
    await passwordField.fill("Kicha@4342");
    await loginBtn.click();

    await browserEventLink.waitFor();


    //logging is brwoserevent link is visible on the page
    console.log(await browserEventLink.isVisible());


    //Assertions link with text Browser events 
    await expect(browserEventLink).toBeVisible();

    await mangageEventsBtn.click();

    console.log(eventTitle);

    await eventTitletxtfld.fill(eventTitle);


    await categorySelectId.selectOption('Festival');

    await cityTxtfld.fill('Bangalore');

    await venueTxtfld.fill('Holi Celebration, neat the bharthiya city, Bangalore');

    await eventdateandTime.pressSequentially(dates);
   


    await priceTxtfld.fill('500.00');

    await totalSeatstxtfld.fill('500');


    await addEventBtn.click();


    await expect(eventCreatedMsg).toBeVisible();

    await page.pause();





});

