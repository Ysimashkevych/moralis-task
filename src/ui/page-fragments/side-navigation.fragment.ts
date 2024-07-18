import { Page } from "@playwright/test";

enum NavigationButtonsTitles { 
    Nodes = "Nodes"
}

export class SideNavigationPanelFragment {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async clickOnNavigationButtonByTitle(title: NavigationButtonsTitles) {
        await this.page.locator(`button[title="${title}"]`).click();
    }

    async openNodesPage() {
        await this.clickOnNavigationButtonByTitle(NavigationButtonsTitles.Nodes);
    }
}