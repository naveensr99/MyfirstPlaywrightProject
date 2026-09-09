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

    await emailField.fill("Jackie@gmail.com");
    await passwordField.fill("Kicha@4342");
    await loginBtn.click();
    await browserEventLink.waitFor();
    expect (browserEventLink).toBeVisible();

    return page;
    }


    test('Single ticket booking is eligible for refund', async ({ browser }) => {
        
        const page=await loginAndGoToBooking(browser, 'https://eventhub.rahulshettyacademy.com');

        const eventsBtn= page.locator("[id='nav-events']");

        await eventsBtn.waitFor();
        
        await eventsBtn.click();

        await page.waitForLoadState('networkidle');

        // Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
        const eventCards= await page.locator('[id="event-card"]').locator('[data-testid="book-now-btn"]');
        await eventCards.first().click();

      
        const fullNameField = page.locator('[id="customerName"]');
        const emailField = page.locator('[id="customer-email"]');
        const phoneField = page.locator('[id="phone"]');
        const confirmBookingBtn = page.locator('.confirm-booking-btn');
        
        //Fill full name,Email and phone number and click on confirm booking button
        await fullNameField.fill('John Doe');
        await emailField.fill('john.doe@example.com');
        await phoneField.fill('1234567890');

        await confirmBookingBtn.click();
        await page.getByText('Booking Confirmed!').waitFor();
        expect(page.getByText('Booking Confirmed!')).toBeVisible();
 


        //Step 3 Navigate to booking detail
        
        await page.getByText('View My Bookings').click(); 
        await page.getByText('My Bookings').first().waitFor();

        await page.waitForLoadState('networkidle');
        const pageURL=await page.url();
        console.log("Booking detail page URL:", pageURL);

        //Assert URL is /bookings
        expect(pageURL).toContain('/bookings');
        

        const bookingDetails=page.locator('[id="booking-card"]').getByText('View Details');
        await bookingDetails.first().click();

        //Assertion text Booking information is visible on the booking detail page
        await expect(page.getByText('Booking Information')).toBeVisible();

        //Step 4 Validate booking ref

        const BookingRef=await page.locator('.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm').textContent();
        console.log("Booking Reference:", BookingRef);


        // Assert validation : "first character of booking ref equals first character of event title"
        
        expect(BookingRef.trim().startsWith("D")).toBeTruthy();


        //Step 5 — Check refund eligibility

        await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();

        // Assert: spinner element (#refund-spinner) is immediately visible
        await expect(page.locator('#refund-spinner')).toBeVisible();

        await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });


    




        


        
        await page.pause(2000); // Pause for 2 seconds to allow the booking confirmation message to be visible


    });
