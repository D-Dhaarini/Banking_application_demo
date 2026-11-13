// pages/TransactionHistoryPage.ts
import { expect,Page } from '@playwright/test';

export class TransactionHistoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openTransactionHistory() {
        // Click the "Transactions" button to open the transaction history
        await this.page.getByRole('button', { name: 'Transactions' }).click();
        await expect(this.page.getByRole('cell', { name: 'Date-Time' })).toBeVisible(); 
        await this.page.screenshot({ path: 'transaction.png' });
        const value:string[]=await this.page.getByRole('table').allTextContents();
        const trimmedValue = value.map((text) => text.trim());
        //const singleLineValue = trimmedValue.join(' | ').replace(/\s+/g,' '); // Join the array into a single line with a separator
        console.log('table Values:', trimmedValue);
       // console.log('Single line table Values:', singleLineValue);
        
       
    }

    

    // async verifyTransaction(type: string, amount: number, balance: number) {
    //     const transactions = await this.getTransactionHistory();

    //     // Check if the transaction exists in the history
    //     const transaction = transactions.find(
    //         (t) => t.type === type && t.amount === amount 
    //     );
    //     console.log('Transactions:', transactions);
    //     // expect(transaction).toBeDefined();
    //     // console.log(`Transaction verified: ${type} of ${amount} with balance ${balance}`);
    // }
}