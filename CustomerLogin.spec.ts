import{test,expect} from '@playwright/test';
import {CustomerLoginPage} from '../pages/CustomerLoginPage';

test('Login as Customer',async({page})=>{
    const loginPage=new CustomerLoginPage(page);
    await loginPage.navigateToLoginPage();

  // Perform login
  await loginPage.clickCustomerLoginButton();
  await loginPage.selectUserByIndex(2);
  await loginPage.clickLoginButton();

  // Add assertions
  await expect(page.getByText("welcome Harry potter")).toBeVisible();
});