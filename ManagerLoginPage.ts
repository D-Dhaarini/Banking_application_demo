import{Page} from '@playwright/test';
export class ManagerLoginPage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async navigateToLoginPage(){
        await this.page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    }
    async clickManagerLoginButton(){
        await this.page.getByRole("button", { name: "Bank Manager Login" }).click();
    }
    async clickAddCustomerButton(firstName:string,lastName:string,postCode:number){
        await this.page.getByRole("button", { name: "Add Customer" }).click();
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await this.page.getByRole('textbox', { name: 'Post Code' }).fill(postCode.toString());
        await this.page.getByRole("button", { name: "Add Customer" }).last().click();
    }
    async clickOpenAccountButton(user:number,currency:number){
        await this.page.getByRole("button", { name: "Open Account" }).click();
        await this.page.locator("#userSelect").selectOption({index:user});
        await this.page.locator("#currency").selectOption({index:currency});
        await this.page.getByRole('button',{name:'Process'}).click();

        
    }
}