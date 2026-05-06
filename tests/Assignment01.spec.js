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

    const eventsHub = page.locator('[id="nav-events"]');

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


    const event_cards= page.locator('[id="event-card"]');

    //this helps to genereate the a unique event title using test event
    const eventTitle = `Test Event ${Date.now()}`;


    const defaultTicketCount=page.locator('#ticket-count');

    const fullName=page.getByLabel('Full Name');

    const Email=page.locator('#customer-email');

    const phoneTxtfld=page.locator('#customer-email');






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

    // await eventTitletxtfld.fill(eventTitle);


    // await categorySelectId.selectOption('Festival');

    // await cityTxtfld.fill('Bangalore');

    // await venueTxtfld.fill('Holi Celebration, neat the bharthiya city, Bangalore');

    // await eventdateandTime.pressSequentially(dates);

    // await priceTxtfld.fill('500.00');

    // await totalSeatstxtfld.fill('500');


    // await addEventBtn.click();


    // await expect(eventCreatedMsg).toBeVisible();


    await eventsHub.click();    
    await event_cards.first().waitFor({ state: 'visible' });

    // const eventCards=await event_cards.allTextContents();

    const eventCardsCount=await event_cards.count();

    // Trying to check the new branch

    let seatsBeforeBooking;

    for(let i=0;i<eventCardsCount;i++){
        await event_cards.nth(i).waitFor();
        const eventName=await event_cards.nth(i).locator('h3').textContent();
        if(eventName==='Test Event 1777440017815'){
            await expect(eventName).toBeVisible();
            console.log(eventName);
            const seatsleft=await event_cards.nth(i).locator('[class="text-xs font-semibold text-emerald-600"]').textContent();
            seatsBeforeBooking=seatsleft.split(' ')[0];
            console.log("seatsBeforeBooking :"+seatsBeforeBooking);

            await expect(event_cards.nth(i).locator("#book-now-btn")).toBeVisible();
            await event_cards.nth(i).locator("#book-now-btn").click();
        }

        expect





    }










    



    await page.pause();

    





});

