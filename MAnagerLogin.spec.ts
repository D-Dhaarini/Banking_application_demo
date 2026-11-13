import {test,expect} from '@playwright/test';
import { ManagerLoginPage } from '../pages/ManagerLoginPage';
test('Login as Manager',async({page})=>{
    const loginPage=new ManagerLoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickManagerLoginButton();
    await loginPage.clickAddCustomerButton('john','Doe',123675);
     page.once('dialog',async(dialog)=>{
     //expect(dialog.message()).toContain("Customer added successfully with customer id");    
         await dialog.accept();
    })
    
    await loginPage.clickOpenAccountButton(2,1);
    page.once('dialog',async(dialog)=>{
        //expect(dialog.message()).toContain("Account created successfully with account Number");
           await dialog.accept();
       })
       console.log("Manager login and operations completed successfully.");
});