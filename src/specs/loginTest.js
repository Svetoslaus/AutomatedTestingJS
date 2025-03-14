import { expect } from 'chai';


describe('SauceDemo Login Tests', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
    });

    it('UC-1: Test login form with empty credentials', async () => {
        await $('#user-name').setValue(''); 
        await $('#password').setValue(''); 
        await $('.btn_action').click(); 

        const errorMsg = await $('.error-message-container').getText();
        expect(errorMsg).to.include('Username is required');
    });

    it('UC-2: Test login form with missing password', async () => {
        await $('#user-name').setValue('standard_user'); 
        await $('#password').setValue(''); 
        await $('.btn_action').click(); 

        const errorMsg = await $('.error-message-container').getText();
        expect(errorMsg).to.include('Password is required');
    });

    it('UC-3: Test login form with valid credentials', async () => {
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('.btn_action').click();

        await $('span.title').waitForDisplayed();

        const pageHeader = await $('span.title').getText();
        expect(pageHeader).to.equal('Products');
    });
});
