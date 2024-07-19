import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#admin-login-email');
        this.passwordInput = page.locator('#admin-login-password');
        this.logInButton = page.locator('button', { hasText: 'Log In' });
    }

    async acceptAllCookies() {
        this.page.locator('#cookiescript_accept').click();
    }

    async setEmail(email: string) {
        await this.emailInput.fill(email);
    };

    async setPassword(password: string) {
        await this.passwordInput.fill(password);
    };

    async clickLogin() {
        await this.logInButton.click();
    };
}