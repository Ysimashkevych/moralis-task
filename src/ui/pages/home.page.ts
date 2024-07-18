import { Page } from "@playwright/test";
import { SideNavigationPanelFragment } from "../page-fragments/side-navigation.fragment";

export class HomePage extends SideNavigationPanelFragment{

    constructor(page: Page) {
        super(page);
    }


}