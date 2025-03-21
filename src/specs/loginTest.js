import { expect } from 'chai';
import LoginPage from '../pages/LoginPage';
import log from '../utils/logger'; 

// Load test data dynamically
const testData = await import('../data/testData.json', { assert: { type: "json" } }).then(m => m.default);

describe('SauceDemo Login Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    // test cases dynamically
    testData.loginTests.forEach(({ username, password, expectedMessage }) => {
        it(`Login with username: "${username}" and password: "${password}"`, async () => {
            console.log(`Running test with: username=${username}, password=${password}`);

            await LoginPage.login(username, password);

            if (expectedMessage === "Swag Labs") {
                // successful login
                const title = await browser.getTitle();
                expect(title).to.equal(expectedMessage);
            } else {
                // error message for invalid login
                await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });
                const errorMsg = await LoginPage.getErrorMessage();
                
                // flexible matching
                expect(errorMsg).to.include(expectedMessage);
            }
        });
    });
});
