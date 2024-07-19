import { expect, Locator, Page } from "@playwright/test";
import { SideNavigationPanelFragment } from "../page-fragments/side-navigation.fragment";

export class NodesPage extends SideNavigationPanelFragment {
    private createANewNodeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.createANewNodeButton = page.locator('//button[text()="Create a New Node"]');
    }

    private sectionLocatorByProtocolName(protocolName: string): Locator {
        return this.page.locator(`//section[descendant::span[text()="${protocolName}"]]`);
    }

    async createANewNode() {
        await this.createANewNodeButton.click();
    }

    async nodesForProtocolShoulsBeAvailable(protocolName: string) {
        await this.sectionLocatorByProtocolName(protocolName).waitFor({ timeout: 3000 });
    }

    async expandSectionForProtocol(protocolName: string) {
        const sectionButton = this.sectionLocatorByProtocolName(protocolName).locator('button[data-style="accordion-button"]');
        const isExpanded = await sectionButton.getAttribute('aria-expanded', { timeout: 2000 }) === 'true';

        if(!isExpanded) {
            await sectionButton.click();
        }
    }

    async siteURLForNodeShouldMatch(protocol: string, siteIndex: number, regExp: RegExp) {
        const siteInput = this.sectionLocatorByProtocolName(protocol).locator(`//div[child::span[. ="Site ${siteIndex}"]]//input`);
        const availableValueForInput = await siteInput.getAttribute('value');
        expect(availableValueForInput).toMatch(regExp);
    }
}