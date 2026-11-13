import { expect, Page } from "@playwright/test";
export class withdrawalPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async clickWithdrawalButton(amount:number){
        await this.page.getByRole("button", { name: "Withdrawl" }).click();
        // const initialWBalance = Number(
        //     (await this.page.locator('strong').allTextContents())[3]
        // );
        await expect(this.page.getByText('Amount to be Withdrawn')).toBeVisible();
        await this.page.locator('input[ng-model="amount"]').fill(amount.toString());
        await this.page.getByRole('button', { name: 'Withdraw' }).last().click();
        await expect(this.page.locator('span.error')).toHaveText('Transaction successful')

    
}
}