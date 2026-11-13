import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { DepositPage } from '../pages/DepositPage';
import { withdrawalPage } from '../pages/withdrawalPage';



test.beforeEach('Login as Customer', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCustomerLoginButton();
    await loginPage.selectUserByIndex(2);
    await loginPage.clickLoginButton();
    await expect(page.getByText("welcome Harry potter")).toBeVisible();
});
test.describe('Customer Operations', () => {
test("Deposit Amount", async ({ page }) => {
    const depositPage = new DepositPage(page);
    const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before deposit: " + initialBalance.toString());
    const depositAmount = 2000;
    await depositPage.clickDepositButton(depositAmount);
    await expect(page.getByText("Deposit Successful")).toBeVisible();
    const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    expect(updatedBalance).toBe(initialBalance + depositAmount);
    console.log("Amount deposited successfully and balance updated to: " + updatedBalance);
});



test('Withdraw Amount', async ({ page }) => {
    await page.getByRole("button", { name: "Deposit" }).click();
    const depositPage = new DepositPage(page);
    const withdrawaPage = new withdrawalPage(page);
    const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before deposit: " + initialBalance.toString());
    const depositAmount = 10000;
    await depositPage.clickDepositButton(depositAmount);
    await expect(page.getByText("Deposit Successful")).toBeVisible();
    const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    expect(updatedBalance).toBe(initialBalance + depositAmount);
    console.log("Amount deposited successfully and balance updated to: " + updatedBalance);
    const withdrawAmount = 50;
    const initialWBalance = Number(
        (await page.locator('strong').allTextContents())[3] );
    await withdrawaPage.clickWithdrawalButton(50);
    const updatedWBalance = Number(
        (await page.locator('strong').allTextContents())[3]);

    console.log('Balance after withdrawal:', updatedWBalance);

    // Verify balance reduction
    expect(updatedWBalance).toBe(initialWBalance - withdrawAmount);

    console.log(`Successfully withdraw ${withdrawAmount}. Updated Balance: ${updatedWBalance}`);
});
});