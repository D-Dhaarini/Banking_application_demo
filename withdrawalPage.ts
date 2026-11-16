import { expect, Page } from "@playwright/test";
export class withdrawalPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async clickWithdrawalButton(amount:number){
        await this.page.getByRole("button", { name: "Withdrawl" }).click();
        const initialWBalance = Number(
            (await this.page.locator('strong').allTextContents())[3]
        );
        await expect(this.page.getByText('Amount to be Withdrawn')).toBeVisible();
        await this.page.locator('input[ng-model="amount"]').fill(amount.toString());
        await this.page.getByRole('button', { name: 'Withdraw' }).last().click();
        if(amount<0){
            console.log("Invalid Amount");
            return;
        }
        if(initialWBalance<amount){
            const message=await this.page.locator('span.error').allTextContents();
            expect(message.some(msg=>msg.includes('Transaction Failed'))).toBeTruthy();
            console.log(message);
        }

        else{
            const message=await this.page.locator('span.error').allTextContents();
            expect(message.some(msg=>msg.includes('Transaction successful'))).toBeTruthy();
            console.log(message);
        }
        //await expect(this.page.locator('span.error')).toHaveText('Transaction successful')

    
}
}
