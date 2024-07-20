import { RPCNodesAPI } from "../../api-requests/rpc/rpc-nodes-api";
import test, { expect } from "@playwright/test";

// assumption is that noed is precreated before test is executed

const expectedResponsePoperties = [
    'number',
    'hash',
    'transactions',
    'parentHash',
    'nonce',
    'sha3Uncles',
    'logsBloom',
    'transactionsRoot',
    'stateRoot',
    'receiptsRoot',
    'miner',
    'difficulty',
    'totalDifficulty',
    'extraData',
    'size',
    'gasLimit',
    'gasUsed',
    'timestamp',
    'uncles'
];

let nodesAPI: RPCNodesAPI;

test.beforeAll(() => {
    nodesAPI = new RPCNodesAPI();
});

test('As a User, I should be able to retrieve full transaction information for the latest block @positive', async () => {
    const response = await nodesAPI.getBlockByNumber('latest', true);
    expect(response.status).toEqual(200);
    const data = response.data;
    for (const property of expectedResponsePoperties) {
        const actual = data.result[property];
        expect(actual, `${property} is not defined inside result returned.`).toBeDefined();
    }
});

[
    { block: 'something', expectedMessage: 'Invalid params', expectedData: 'hex string without 0x prefix' },
    { block: '0x57657576586758764jhgjhtu6876', expectedMessage: 'invalid argument 0: hex number > 64 bits' },
    { block: '', expectedMessage: 'invalid argument 0: empty hex string' },

].forEach(({ block, expectedMessage, expectedData }) => {
    test(`As a User, I should receive an error message in case of invalid block number @negative : value: "${block}"`, async () => {
        const response = await nodesAPI.getBlockByNumber(block, true);
        expect(response.status).toEqual(200);
        const error = response.data.error;
        expect(error.message).toEqual(expectedMessage);
        expect(error.code).toEqual(-32602);
        if (expectedData) expect(error.data).toEqual(expectedData);
    });
});
