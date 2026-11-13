import { Page } from "@playwright/test";
export class WithdrawalPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async clickWithdrawalButton(amount:number){
        await this.page.getByRole("button", { name: "Withdrawl" }).click();
        await this.page.getByRole('spinbutton', { name: 'amount' }).fill(amount.toString());
       const sam= await this.page.getByRole('spinbutton', { name: 'amount' }).innerText();
        console.log(sam);
        await this.page.getByRole('button', { name: 'Withdraw' }).last().click();
    }
}