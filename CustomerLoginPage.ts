import{Page} from '@playwright/test';
export class CustomerLoginPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async navigateToLoginPage(){
        await this.page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    }
    async clickCustomerLoginButton(){
        await this.page.getByRole("button", { name: "Customer Login" }).click();
    }
    async selectUserByIndex(index:number){
        await this.page.locator("#userSelect").selectOption({ index });
    }
    async clickLoginButton(){
        await this.page.getByRole("button", { name: "Login" }).click();
    }
}