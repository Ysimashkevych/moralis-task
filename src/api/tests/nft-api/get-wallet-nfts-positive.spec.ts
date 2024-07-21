import test, { expect } from '@playwright/test';
import { WalletNfts } from '../../api-requests/nft/get-wallet-nfts';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';

let response: GetWalletNFTsJSONResponse;
const payload = {
    chain: '0x1', // negative for this
    format: 'decimal', // negative for this
    limit: 10,
    excludeSpam: true,
    mediaItems: false,
    address: '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e',
    tokenAddresses: undefined,
    cursor: undefined,
    normalizeMetadata: true
};

test.beforeAll(async () => {
    const walletNfts = new WalletNfts();
    await walletNfts.init();
    response = await walletNfts.getWalletNfts(payload);
});

test('As a User, I want to be able to retreive NFTs owned by a given address @positive', async () => {
    const result = response.result;
    for (const item of result) {
        expect(item.owner_of).toEqual(payload.address);
    }
});


test('As a User, I want to be able to retreive NFTs with the tokenId in decimal format @positive', async () => {
    const result = response.result;
    for (const item of result) {
        expect(item.token_id).toMatch(/\d+/);
    }
});

test('As a User, I want to be able to receive number of NFTs in result as specified in payload @positive', async () => {
    expect(response.page_size).toEqual(payload.limit);
    const result = response.result;
    expect(result.length).toEqual(payload.limit);
});