import { Locator, Page } from "@playwright/test";

export class CreateNodeDialog {
    readonly page: Page;
    private protocolSelect: Locator;
    private networkSelect: Locator;
    private creareNodeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.protocolSelect = page.locator('#select-protoccol');
        this.networkSelect = page.locator('#select-network');
        this.creareNodeButton = page.locator('//footer//button[text()="Create Node"]');
    }

    async selectProtocol(protocol: string) {
        await this.protocolSelect.selectOption(protocol);
    }

    async selectNetwork(network: string) {
        await this.networkSelect.selectOption(network);
    }

    async createNode() {
        await this.creareNodeButton.click();
    }
}