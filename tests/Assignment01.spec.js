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
    
    const fullName=page.getByLabel('Full Name');

    const Email=page.locator('#customer-email');

    const phoneTxtfld=page.locator('#phone');

    const confirmBookingBtn=page.locator('.confirm-booking-btn');


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


    await eventsHub.click();    
    await event_cards.first().waitFor({ state: 'visible' });

    // const eventCards=await event_cards.allTextContents();

    const eventCardsCount=await event_cards.count();

    // Trying to check the new branch

    let seatsBeforeBooking;

    for(let i=0;i<eventCardsCount;i++){
        await event_cards.nth(i).waitFor();
        const eventName=await event_cards.nth(i).locator('h3').textContent();
        if(eventName===eventTitle){
            console.log(eventName);
            const seatsleft=await event_cards.nth(i).locator('[class="text-xs font-semibold text-emerald-600"]').textContent();
            seatsBeforeBooking=seatsleft.split(' ')[0];
            console.log("seatsBeforeBooking :"+seatsBeforeBooking);

            await expect(event_cards.nth(i).locator("#book-now-btn")).toBeVisible();
            await event_cards.nth(i).locator("#book-now-btn").click();
        }
    }



    const defaultTicketCount=await page.locator('#ticket-count').textContent();


    await expect(defaultTicketCount).toBe('1');
    await fullName.fill('Naveen Kumar');
    await Email.fill('customer123@gmail.com');
    await phoneTxtfld.fill('9876543210');

    await confirmBookingBtn.click();


    // const bookingRefNumber=await page.locator('.bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5 text-left space-y-2').locator("flex items-center justify-between text-sm").nth(1).textContent();
    
    const bookingRefNumber= await page.locator('.bg-indigo-50.border.border-indigo-100.rounded-xl.p-4.mb-5.text-left.space-y-2').locator('.flex.items-center.justify-between.text-sm').nth(0).textContent();

    const bookingRefNumberText=await bookingRefNumber.split(' ')[1];

    const bookingRefNumberTextSplit=bookingRefNumberText.split('f')[1];

    console.log("Booking reference number :"+bookingRefNumberTextSplit);

    const myBookinglink=page.locator('#nav-bookings');

    await myBookinglink.click();


    await page.waitForURL('**/bookings');
    //Assertion to check if the url contains bookings after clicking on my bookings link
    await  expect(page.url().includes('bookings')).toBeTruthy();


    //Get all booking cards (locate by id #booking-card)
    const bookingCards= await page.locator('#booking-card');

    const bookingref= await page.locator('.booking-ref');

    await bookingCards.first().waitFor({ state: 'visible' });

    // Assert the first booking card is visible
    await expect(bookingCards.nth(0).isVisible()).toBeTruthy();

    await expect(bookingref.nth(0)).toBeVisible();

    const bookingrefCount=await bookingref.count();
    // Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
    //bookingRefNumberText
    for(let j=0;j<bookingrefCount;j++){
        const bookingRefText=await bookingref.nth(j).textContent();
        if(bookingRefText.includes(bookingRefNumberTextSplit)){
            console.log("Booking reference found in booking cards :"+bookingRefText);
            break;
        }
    }



    await eventsHub.click();    
    await event_cards.first().waitFor({ state: 'visible' });
    
    // const eventCards=await event_cards.allTextContents();

    const eventCardsCount2=await event_cards.count();

    // Trying to check the new branch

    let seatsAfterBooking;

    for(let i=0;i<eventCardsCount2;i++){
        await event_cards.nth(i).waitFor();
        const eventName=await event_cards.nth(i).locator('h3').textContent();
        if(eventName===eventTitle){
            console.log(eventName);
            const seatsleft=await event_cards.nth(i).locator('[class="text-xs font-semibold text-emerald-600"]').textContent();
            seatsAfterBooking=seatsleft.split(' ')[0];
            expect(parseInt(seatsAfterBooking)).toBe(parseInt(seatsBeforeBooking)-1);
            console.log("seatsAfterBooking :"+seatsAfterBooking);
        }
    }




































    



    await page.pause();

    





});

