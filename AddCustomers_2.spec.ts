import {test,expect} from '@playwright/test';
test.beforeEach("Customer login",async({page})=>{
    await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await page.getByRole("button",{name:"Customer Login"}).click();
    await page.locator("#userSelect").selectOption({index:2});
    await page.getByRole("button",{name:"Login"}).click();
})
// test("Add Customers",async({page})=>{
//     await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
//     await page.getByRole("button",{name:"Bank Manager Login"}).click();
//     await page.getByRole("button",{name:"Add Customer"}).click();
//     await page.getByRole("textbox",{name:"First Name"}).fill("John");
//     await  page.getByRole("textbox",{name:"Last Name"}).fill("Doe");
//     await  page.getByRole("textbox",{name:"Post Code"}).fill("786547");
//     await page.getByRole("button",{name:"Add Customer"}).last().click();
//     page.once('dialog',dialog=>{
//         expect(dialog.message()).toContain("Customer added successfully");
//         dialog.accept();
//     });
//     console.log("Customer added successfully");
// });
// test("Open Account",async({page})=>{
//     await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
//     await page.getByRole("button",{name:"Bank Manager Login"}).click();
//     await page.getByRole("button",{name:"Open Account"}).click();
//     await page.locator("#userSelect").selectOption({index:1});
//     await page.locator("#currency").selectOption({label:"Pound"});
//     await page.getByRole("button",{name:"Process"}).click();
//     page.once('dialog',dialog=>{
//         expect(dialog.message()).toContain("Customer added successfully");
//         dialog.accept();
//     });
//     console.log("Account opened successfully");
// });

test("Deposit Amount",async({page})=>{
    await page.getByRole("button",{name:"Deposit"}).click();
     
    const initialBalance=Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before deposit: "+initialBalance.toString()); 
    const depositAmount=10000;
    await page.getByRole("spinbutton",{name:"Amount"}).fill(depositAmount.toString());
    await page.getByRole("button",{name:"Deposit"}).nth(1).click();
    await expect(page.getByText("Deposit Successful")).toBeVisible();
    const updatedBalance=Number(await page.locator('.center Strong').nth(1).textContent());
    expect(updatedBalance).toBe(initialBalance+depositAmount);
    console.log("Amount deposited successfully and balance updated to: "+updatedBalance);
//});
//test("Withdraw Amount",async({page})=>{
    await page.getByRole("button",{name:"Withdrawl"}).click();
    const initialWBalance=Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before withdrawal: "+initialWBalance.toString()); 
    const withdrawAmount=500;
    await page.getByRole("spinbutton",{name:"amount"}).fill(withdrawAmount.toString());
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText("Transaction successful")).toBeVisible();
    const updatedWBalance=Number(await page.locator('.center Strong').nth(1).textContent());
    console.log(updatedWBalance);
    //expect(updatedWBalance).toBe(initialWBalance-withdrawAmount);
    //await expect(page.getByText("Transaction successful")).toBeVisible();
    console.log("Amount withdrawn successfully and balance updated to: "+updatedWBalance);
});