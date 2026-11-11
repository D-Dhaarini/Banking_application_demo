import {test,expect} from '@playwright/test';
test("Add Customers",async({page})=>{
    await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await page.getByRole("button",{name:"Bank Manager Login"}).click();
    await page.getByRole("button",{name:"Add Customer"}).click();
    await page.getByRole("textbox",{name:"First Name"}).fill("John");
    await  page.getByRole("textbox",{name:"Last Name"}).fill("Doe");
    await  page.getByRole("textbox",{name:"Post Code"}).fill("786547");
    await page.getByRole("button",{name:"Add Customer"}).last().click();
    page.once('dialog',dialog=>{
        expect(dialog.message()).toContain("Customer added successfully");
        dialog.accept();
    });
    console.log("Customer added successfully");
});
test("Open Account",async({page})=>{
    await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await page.getByRole("button",{name:"Bank Manager Login"}).click();
    await page.getByRole("button",{name:"Open Account"}).click();
    await page.locator("#userSelect").selectOption({index:1});
    await page.locator("#currency").selectOption({label:"Pound"});
    await page.getByRole("button",{name:"Process"}).click();
    page.once('dialog',dialog=>{
        expect(dialog.message()).toContain("Customer added successfully");
        dialog.accept();
    });
    console.log("Account opened successfully");
});
// test("Deposit Amount",async({page})=>{
//     await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
//     await page.getByRole("button",{name:"Customer Login"}).click();
//     await page.getByRole("combobox",{name:"Your Name"}).selectOption({label:"Harry Potter"});
//     await page.getByRole("button",{name:"Login"}).click();
//     await page.getByRole("button",{name:"Deposit"}).click();
//     await page.getByRole("spinbutton",{name:"Amount"}).fill("1000");
//     await page.getByRole("button",{name:"Deposit"}).click();
//     console.log("Amount deposited successfully");
// });