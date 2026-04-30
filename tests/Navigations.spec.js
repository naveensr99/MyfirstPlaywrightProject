const{test,expect}=require('@playwright/test');


test("Lanunching koerber one",async({browser})=>{


    let age=0;
    let text = (age < 18) ? "Minor" : "Adult";



    let employees=["Naveen","Mukesh","Kicha","Suresh"];

    for(let i=0;i<employees.length;i++){    
        console.log("Weclcome"+employees[i]+"to Koerber");                              
    }   
    //for loop






    //SWITCH CASE

    switch(age){
        case 18:
            console.log("You are 18 years old");
            break;
        case 26:
            console.log("You are 26 years old");
            break;
        default:
            console.log("You are neither 18 nor 26 years old");
    }








    //terranary operator

   

    console.log(text);  


    // a simple function to print the name 
    function printNames(names){
        console.log("Welcome to Koerber "+names);
    }

    function compareNumbers(num1,num2){

        if(num1>num2){
            console.log(num1+" is greater than "+num2);
        }
        else{
            console.log(num2+" is greater than "+num1);
        }

    }

    printNames("Naveen");
    printNames("Mukesh");

    compareNumbers(10,20);









    function getFutureDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }


    const futureDate=getFutureDate(5);
    console.log(futureDate);



    const date='2026-04-20';
    const dates=date.split('-');
    const requiredDate=dates[1]+dates[2]+dates[0];
    console.log(dates[1]);

    console.log(dates[1]+dates[2]+dates[0]);

    //04202026




    // const context=await browser.newContext();
    // const page=await context.newPage();
    // await page.goto("https://eventhub.rahulshettyacademy.com");

    // const emailField=page.locator('#email');
    // const passwordField=page.locator('#password');
    // const loginBtn=page.locator("#login-btn");
    // const browserEventLink=page.getByText("Browse Events →");

    // const mangageEventsBtn=page.getByText("Manage Events");



    // //this helps to genereate the a unique event title using test event
    // const eventTitle = `Test Event ${Date.now()}`;


    // await page.goto("https://eventhub.rahulshettyacademy.com");

    // await emailField.fill("naveen123@gmail.com");
    // await passwordField.fill("Kicha@4342");
    // await loginBtn.click();

    // await browserEventLink.waitFor();

    // console.log(eventTitle);

    // //logging is brwoserevent link is visible on the page
    // console.log(await browserEventLink.isVisible());


    // //Assertions link with text Browser events 
    // await expect(browserEventLink).toBeVisible();
    // await mangageEventsBtn.click();



    // //Navigators
    // await page.goBack();
    // await page.goForward();
    // await page.pause();

    
});

