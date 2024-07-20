import test, { expect } from "@playwright/test";
import { RPCNodesAPI } from "../../api-requests/rpc/rpc-nodes-api";

let nodesAPI: RPCNodesAPI;
test.beforeAll(() => {
    nodesAPI = new RPCNodesAPI();
});

test('As a User, I should be able to retvieve a transaction information by its hash @positive', async () => {
    const expectedResult = {
        hash: "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3",
        nonce: "0xd1011",
        blockHash: "0x18173058d45f8aa984181fdfbfece01a93a971ea63e008231b2e15f151e0903f",
        blockNumber: "0x12b39a9",
        transactionIndex: "0x11d",
        from: "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        to: "0x388c818ca8b9251b393131c08a736a67ccb19297",
        value: "0xc6bb29ae2fc521",
        gasPrice: "0x3bb51048b",
        gas: "0x565f",
        maxFeePerGas: "0x3bb51048b",
        maxPriorityFeePerGas: "0x0",
        input: "0x",
        r: "0xb5216478c796c699bb8a61ac277d94597d609a28c733262cafecc2f427fa0416",
        s: "0x68d624e0c138dfe70b5023126aa59220f7dee7d2e5300e918718504f7b92217d",
        v: "0x1",
        yParity: "0x1",
        chainId: "0x1",
        accessList: [
        ],
        type: "0x2",
    };
    const response = await nodesAPI.getTransactionByHash(expectedResult.hash);
    const data = response.data;
    expect(data.result).toEqual(expectedResult);
});

test('As a user, I should should receive an error in case of not available transaction hash provided @negative', async () => {
    const response = await nodesAPI.getTransactionByHash('0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316_*&ad3');
    const error = response.data.error;
    expect(error.message).toEqual('Invalid params');
    expect(error.data).toEqual(`invalid character '_' at position 58 at line 1 column 68`);
})