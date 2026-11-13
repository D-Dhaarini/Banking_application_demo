import{Page} from '@playwright/test';
export class DepositPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async clickDepositButton(amount:number){
        await this.page.getByRole("button", { name: "Deposit" }).click();
        await this.page.getByRole('spinbutton', { name: 'amount' }).fill(amount.toString());
        await this.page.getByRole('button', { name: 'Deposit' }).last().click();
    }

}