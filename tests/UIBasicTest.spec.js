const {test, expect} = require('@playwright/test');


test('My first playwright test', async ({browser})=> 
{
//chrome -plugins/ cookies 
// storing the browser inide the varialbe 
// In js we have only 2 varialbles let and const
// mostly used is const 

// we dont need the below 2 lines of code if we delcare inside above starting of the test declaration 

const context= await browser.newContext();
const page=await context.newPage();

await page.goto("https://google.com")

});


// if we use the test.only than only this test will be run 
test
('My second playwright test', async ({browser,page})=> 
{
//chrome -plugins/ cookies 
// storing the browser inide the varialbe 
// In js we have only 2 varialbles let and const
// mostly used is const 

// we dont need the below 2 lines of code if we delcare inside above starting of the test declaration 

// chrome-plugins/cookies 
// const context= await browser.newContext();
// const page=await context.newPage();

await page.goto("https://google.com")

//get title -asseration
const pageTitle =await page.title();
console.log("Page title "+ pageTitle);

await expect(page).toHaveTitle("Google");


});


test("Landing into new application",async({browser,page})=>{

    const username= page.locator('#userEmail');
    const password= page.locator('#userPassword');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const page_t=await page.title();
    console.log(page_t);

    await firstName.fill("naveen1629@gmail.com");
    await lastName.fill("Kicha@4342")

    // parent to child traversal xpath 
    // console.log( await page.locator(".col-sm-8.col-xs-8.col-md-8 h1").textContent());
    // await page.locator("").nth(2) this can be used when the locatiors returns multiple xpaths.


})


test.only("Test to fetch all the card Names in the website",async({browser,page})=>{

    
    const username= page.locator('#userEmail');
    const password= page.locator('#userPassword');

    const cardbody=page.locator('.card-body');
    const loginBtn=page.locator('#login');
    const cartItem=page.locator("h3:has-text('ADIDAS ORIGINAL')");
    const cartButton=page.locator("[routerlink='/dashboard/cart']");

    const selectCoutry=page.locator("[placeholder='Select Country']");

    const countryoptions=page.locator(".ta-results");

    const placeorderBtn=page.locator('.action__submit');




    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const page_t=await page.title();
    console.log(page_t);

    await username.fill("naveen1629@gmail.com");
    await password.fill("Kicha@4342");
    await loginBtn.click();

    
    // waits until the network comes to idle state
    await page.waitForLoadState('networkidle');
    //above wait is not sufficient as its taking more time to load the image objects 
    await page.locator(".card-body b").first().waitFor();


    const count=await cardbody.count();

    for(let i=0;i<count;++i){
        if(await cardbody.nth(i).locator("b").textContent()=="ADIDAS ORIGINAL"){
            await cardbody.nth(i).locator("text= Add To Cart").click();
            console.log("Expected result passed");
            break;
    }}

    await cartButton.click();

    await page.locator("div li").first().waitFor();

    //to verify wheater my item is visibile in the page we can use isVisible
    const bool=await cartItem.isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text='Checkout'").click();

    await selectCoutry.pressSequentially("India");

    await countryoptions.waitFor();

    const count2=await countryoptions.locator('button').count();

    for(let i=0; i<count2; ++i){

        const text= await countryoptions.locator('button').nth(i).textContent();

        if(text==" India"){
            await countryoptions.locator('button').nth(i).click();
            break;
        }
    }



    //Verifying the email:id 
    await expect(page.locator(".user__name label")).toHaveText('naveen1629@gmail.com');

    // await expect(emailid).toContain('naveen1629@gmail.com');
    await placeorderBtn.click();

    await page.locator(".hero-primary").waitFor();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const order_idloc= await page.locator("label.ng-star-inserted").textContent();
    console.log(order_idloc);

    //Removing the extra space and character '!'
    const order_id=order_idloc.split('|')[1].trim();
    console.log(order_id);
    

    await page.locator("[routerlink='/dashboard/myorders']").nth(0).click();

    await page.waitForLoadState();

    await page.locator("tr.ng-star-inserted").nth(1).waitFor();


    const orders_count=await page.locator("tr.ng-star-inserted").count();

    for(let i=0;i<orders_count;++i){

       const text= await page.locator("tr.ng-star-inserted").nth(i).locator('th').textContent();

       if(text===order_id){
        await page.locator("tr.ng-star-inserted").nth(i).locator("text='View'").click();
        console.log("Test passed");
        break;
       }
    }

})



test("UI Controls", async({browser,page})=>
{

    const firstname=page.locator("[placeholder='First Name']");
    const lastname=page.locator("[placeholder='Last Name']");
    const MaleRadioBtn=page.locator("[value='Male']");
    const CricketCheckBox=page.locator("#checkbox1");
    const skillsSelectOptions=page.locator("#Skills");
    const countriesOptions=page.locator("#countries");


    await page.goto("https://demo.automationtesting.in/Register.html");
    await firstname.fill('Naveen');
    await lastname.fill('S R');
    await MaleRadioBtn.click();
    await CricketCheckBox.click();

    await skillsSelectOptions.selectOption("APIs");

    await console.log(MaleRadioBtn.isChecked());

    //Assertions to verify is the radiobtn is checked
    await expect(MaleRadioBtn).toBeChecked();

    await expect(page.locator('#imagetrgt')).toHaveAttribute('id','imagetrgt');
    

    await page.pause();

})


test("Handling child windows", async({browser})=>{

    const context= await browser.newContext();
    const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const assessmentlink=page.locator("[href='https://techsmarthire.com/']");



    const [newPage]= await Promise.all(
   [
    context.waitForEvent('page'), 
    assessmentlink.click(),
   ]);//New page opened.

   console.log(await newPage.title());





   await newPage.pause();
})



