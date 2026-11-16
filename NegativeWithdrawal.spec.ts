import{test,expect} from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { DepositPage } from '../pages/DepositPage';
import { withdrawalPage } from '../pages/withdrawalPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';

test.describe('Validation',async()=>{

test.beforeEach('Login as Customer',async({page})=>{
    const loginPage=new CustomerLoginPage(page);
    await loginPage.navigateToLoginPage();

  // Perform login
  await loginPage.clickCustomerLoginButton();
  await loginPage.selectUserByIndex(2);
  await loginPage.clickLoginButton();

  // Add assertions
  await expect(page.getByText("welcome Harry potter")).toBeVisible();
});
//Negative Withdrawal
test("Negative Withdrawal Validation",async({page})=>{
    const depositPage=new DepositPage(page);
    await depositPage.clickDepositButton(300);
    const withdrawaPage=new withdrawalPage(page);
    const beforeBalance=Number(await page.locator('.center strong').nth(1).textContent());
    console.log('Balance before Negative Withdrawal: '+beforeBalance);
    const amount=-200;
    await withdrawaPage.clickWithdrawalButton(amount);
    const afterBalance=Number(await page.locator('.center strong').nth(1).textContent());
    expect(afterBalance).toBe(beforeBalance);
    console.log(`Balance remained unchanged: ${afterBalance}`)
})
//Insufficient Balance Check
test("Insufficient Balance Check",async({page})=>{
    const depositPage=new DepositPage(page);
    await depositPage.clickDepositButton(300);
    const BalanceBefore=Number(await page.locator('.center strong').nth(1).textContent());
    console.log('Balance before Withdrawal: '+BalanceBefore);
    const withdrawaPage=new withdrawalPage(page);
    await withdrawaPage.clickWithdrawalButton(1000);
    const currentBalance=Number(await page.locator('.center strong').nth(1).textContent());
    expect(BalanceBefore).toBe(currentBalance);
    console.log("Balance After: "+currentBalance);
})
//Multiple Transaction
test('Multiple Transaction',async({page})=>{
    const depositPage=new DepositPage(page);
    const transactionPage=new TransactionHistoryPage(page);
    //Deposit -3000
    await depositPage.clickDepositButton(3000);
    let expectedBalance=Number(await page.locator('.center strong').nth(1).textContent());
    const withdrawaPage=new withdrawalPage(page);
    //withdraw-1000
    await withdrawaPage.clickWithdrawalButton(1000);
    
    expectedBalance-=1000;
    //Deposit-300
    await transactionPage.openTransactionHistory();


    await depositPage.clickDepositButton(300);
    expectedBalance+=300;
    //withdraw-450
    await withdrawaPage.clickWithdrawalButton(450);
    expectedBalance-=450;
    const currentBalance=Number(await page.locator('.center strong').nth(1).textContent());
    expect(expectedBalance).toBe(currentBalance);
    console.log("Expected Balance: "+expectedBalance);
    console.log("Current Balance: "+currentBalance);
    await transactionPage.openTransactionHistory();


    
})
});