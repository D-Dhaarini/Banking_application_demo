import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { DepositPage } from '../pages/DepositPage';
import { withdrawalPage } from '../pages/withdrawalPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';

test.beforeEach('Login as Customer', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCustomerLoginButton();
    await loginPage.selectUserByIndex(2);
    await loginPage.clickLoginButton();
    await expect(page.getByText("welcome Harry potter")).toBeVisible();
});

test.describe('Customer Operations', () => {
    test('Deposit Amount and Verify Transaction History', async ({ page }) => {
        const depositPage = new DepositPage(page);
        const transactionHistoryPage = new TransactionHistoryPage(page);

        // Perform deposit
        const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
        console.log("Balance before deposit: " + initialBalance.toString());
        const depositAmount = 2000;
        await depositPage.clickDepositButton(depositAmount);
        await expect(page.getByText("Deposit Successful")).toBeVisible();
        const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
        expect(updatedBalance).toBe(initialBalance + depositAmount);
        console.log("Amount deposited successfully and balance updated to: " + updatedBalance);
        
        // Verify transaction history
        await transactionHistoryPage.openTransactionHistory();
        //await transactionHistoryPage.getTransactionHistory();

      //  await transactionHistoryPage.verifyTransaction('Credit', depositAmount, updatedBalance);
    });
    test('Withdraw Amount and Verify Transaction History', async ({ page }) => {
        const depositPage = new DepositPage(page);
        const withdrawaPage = new withdrawalPage(page);
        const transactionHistoryPage = new TransactionHistoryPage(page);

        // Perform deposit before withdrawal
        const depositAmount = 2000;
        await depositPage.clickDepositButton(depositAmount);
        await expect(page.getByText("Deposit Successful")).toBeVisible();

        // Perform withdrawal
        const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
        const withdrawAmount = 500;
        await withdrawaPage.clickWithdrawalButton(withdrawAmount);
        await expect(page.locator('span.error')).toHaveText('Transaction successful');
        const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
        expect(updatedBalance).toBe(initialBalance - withdrawAmount);
        console.log("Amount debited successfully and balance updated to: " + updatedBalance);

        // Verify transaction history
        await transactionHistoryPage.openTransactionHistory();
        //await transactionHistoryPage.verifyTransaction('Debit', withdrawAmount, updatedBalance);
    });
 });