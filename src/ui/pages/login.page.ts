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

    public async acceptAllCookies() {
        this.page.locator('#cookiescript_accept').click();
    }

    public async setEmail(email: string) {
        await this.emailInput.fill(email);
    };

    public async setPassword(password: string) {
        await this.passwordInput.fill(password);
    };

    public async clickLogin() {
        await this.logInButton.click();
    };

    /**
     * Performs login into application with accepting all cookies, setting email and password from config, and setting api key received on login to process "API_KEY_BROWSER" property
     */
    public async login() {
        const email = process.env.USER_NAME || '';
        const password = process.env.PASSWORD || '';
    
        await this.page.goto('/');
        await this.acceptAllCookies();
        await this.setEmail(email);
        await this.setPassword(password);
        const loginPromise = this.page.waitForResponse(/.*\/auth\/login/);
        await this.clickLogin();
        const loginResponce = await loginPromise;
        const body = await loginResponce.json();
        process.env['API_KEY_BROWSER'] = body['access_token'];
    }
}