import test from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { NodesPage } from "../pages/nodes.page";
import { getRandomProtocolNetworkPair } from "../utils/get-random-protocol-properties";
import { CreateNodeDialog } from "../pages/create-node.dialog";
import { SiteProtocolSymbols } from "../resources/nodes-protocol-properties";
import { DashboardNodesAPI } from "../../api/api-requests/dashboard/dashboard-nodes";

let nodesPage: NodesPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const homePage = new HomePage(page);
    await homePage.openNodesPage();
    nodesPage = new NodesPage(page);
});

test("As a User, I want to be able to create a new node @positive", async ({ page }) => {
    const nodeProperties = getRandomProtocolNetworkPair();
    const protocolSymbol = SiteProtocolSymbols[nodeProperties.protocol][nodeProperties.network];
    await nodesPage.createANewNode();

    const createNodeDialog = new CreateNodeDialog(page);
    await createNodeDialog.selectProtocol(nodeProperties.protocol);
    await createNodeDialog.selectNetwork(nodeProperties.network);
    await createNodeDialog.createNode();


    await nodesPage.nodesForProtocolShoulsBeAvailable(nodeProperties.protocol);
    await nodesPage.expandSectionForProtocol(nodeProperties.protocol);
    for (let i = 1; i <= 2; i++) {
        await nodesPage.siteURLForNodeShouldMatch(nodeProperties.protocol, i, new RegExp(`https:\/\/site${i}\.moralis-nodes\.com\/${protocolSymbol}\/.*`));
    }
});

test.afterEach(async () => {
    const nodesAPI = new DashboardNodesAPI();
    const nodesAvailable = await nodesAPI.getListOFAvailableNodes();
    for (const node of nodesAvailable) {
        await nodesAPI.deleteNodeByKey(node.key);
    }
});