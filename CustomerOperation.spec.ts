import { test, expect } from '@playwright/test';
test.beforeEach("Customer login", async ({ page }) => {
    await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await page.getByRole("button", { name: "Customer Login" }).click();
    await page.locator("#userSelect").selectOption({ index: 2 });
    await page.getByRole("button", { name: "Login" }).click();
})

test("Deposit Amount", async ({ page }) => {
    await page.getByRole("button", { name: "Deposit" }).click();

    const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before deposit: " + initialBalance.toString());
    const depositAmount = 10000;
    await page.getByRole("spinbutton", { name: "Amount" }).fill(depositAmount.toString());
    await page.getByRole("button", { name: "Deposit" }).nth(1).click();
    await expect(page.getByText("Deposit Successful")).toBeVisible();
    const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    expect(updatedBalance).toBe(initialBalance + depositAmount);
    console.log("Amount deposited successfully and balance updated to: " + updatedBalance);
    });



test('Withdraw Amount', async ({ page }) => {
    await page.getByRole("button", { name: "Deposit" }).click();

    const initialBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    console.log("Balance before deposit: " + initialBalance.toString());
    const depositAmount = 10000;
    await page.getByRole("spinbutton", { name: "Amount" }).fill(depositAmount.toString());
    await page.getByRole("button", { name: "Deposit" }).nth(1).click();
    await expect(page.getByText("Deposit Successful")).toBeVisible();
    const updatedBalance = Number(await page.locator('.center Strong').nth(1).textContent());
    expect(updatedBalance).toBe(initialBalance + depositAmount);
    console.log("Amount deposited successfully and balance updated to: " + updatedBalance);
    // Capture balance before withdrawal

    const initialWBalance = Number(
        (await page.locator('strong').allTextContents())[3]
    );
    console.log('Balance before withdrawal:', initialWBalance);

    // Open withdrawal page
    await page.getByRole('button', { name: 'Withdrawl' }).click();

    // Verify withdrawal screen is displayed
    await expect(
        page.getByText('Amount to be Withdrawn')
    ).toBeVisible();

    const withdrawAmount = 50;

    // Enter withdrawal amount
    await page
        .locator('input[ng-model="amount"]')
        .fill(withdrawAmount.toString());

    // Click Withdraw button
    await page.getByRole('button', { name: 'Withdraw' }).last().click();

    // Verify success message
    await
        expect(page.locator('span.error')).toHaveText('Transaction successful')

    // Capture balance after withdrawal
    const updatedWBalance = Number(
        (await page.locator('strong').allTextContents())[3]
    );

    console.log('Balance after withdrawal:', updatedWBalance);

    // Verify balance reduction
    expect(updatedWBalance).toBe(
        initialWBalance - withdrawAmount
    );

    console.log(
        `Successfully withdraw ${withdrawAmount}. Updated Balance: ${updatedWBalance}`
    );
});