import log from '../utils/logger';

export default class BasePage {
    async open(url) {
        log.info(`Opening URL: ${url}`);
        await browser.url(url);
    }

    async waitForElementToBeVisible(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
    }

    async waitForElementToBeClickable(element, timeout = 5000) {
        await element.waitForClickable({ timeout });
    }
}
