import log from '../utils/logger';
import BasePage from './BasePage';

class LoginPage extends BasePage{
    //define Selectors using XPaths
    get usernameField() { return $('//input[@id="user-name"]'); }
    get passwordField() { return $('//input[@id="password"]'); }
    get loginButton() { return $('//input[@id="login-button"]'); }
    get errorMessage() { return $('//h3[contains(@data-test,"error")]'); }

    async open() {
        console.log('Opening login page...');
        //await browser.url('/');
        await browser.url('https://www.saucedemo.com/');  //update
        await this.usernameField.waitForDisplayed({ timeout: 5000 }); //update

    }

    async login(username, password) {
        console.log(`Logging in with username: ${username} and password: ${password}`);
        //await this.usernameField.setValue(username);
        //await this.passwordField.setValue(password);
        //await this.loginButton.click();
        await this.usernameField.waitForDisplayed({ timeout: 5000 });
        await this.usernameField.setValue(username);

        await this.passwordField.waitForDisplayed({ timeout: 5000 });
        await this.passwordField.setValue(password);

        await this.loginButton.waitForClickable({ timeout: 5000 });
        await this.loginButton.click();

    }

    async clearFields() {
        console.log('Clearing input fields...');
        //await this.usernameField.clearValue();
        //await this.passwordField.clearValue();
        await this.usernameField.waitForDisplayed({ timeout: 5000 });
        await this.usernameField.clearValue();

        await this.passwordField.waitForDisplayed({ timeout: 5000 });
        await this.passwordField.clearValue();
    }

    async getErrorMessage() {
        //if (await this.errorMessage.isExisting()) {
        //    return await this.errorMessage.getText();
        //}
        if (await this.errorMessage.isExisting()) {
            await this.errorMessage.waitForDisplayed({ timeout: 5000 }); // ✅ Ensure message appears
            return await this.errorMessage.getText();
        }
        return null;
    }
}

//module.exports = new LoginPage();
export default new LoginPage();
