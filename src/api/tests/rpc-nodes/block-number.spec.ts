import { RPCNodesAPI } from "../../api-requests/rpc/rpc-nodes-api";
import test, { expect } from "@playwright/test";

test('As a User, I should be able to obtain the number of the most recent block on the chain @positive', async () => {
    const nodesAPI = new RPCNodesAPI();
    const response = await nodesAPI.getLatestBlockNumber();
    const data = response.data;
    expect(data.result).toBeDefined();
});