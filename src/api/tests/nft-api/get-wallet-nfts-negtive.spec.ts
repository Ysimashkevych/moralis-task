import test, { expect } from '@playwright/test';
import { WalletNfts } from '../../api-requests/nft/get-wallet-nfts';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';

let walletNfts: WalletNfts;
const payloadTemplate = {
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
    walletNfts = new WalletNfts();
    await walletNfts.init();
});

test('As a User, I want to see an error in case of invalid chain specified in request payload @negative', async () => {
    const payload = { ...payloadTemplate };
    payload.chain = 'etherium';
    const error = await walletNfts.getWalletNfts(payload, true);
    expect(error.message).toEqual("[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'");
});

test('As a User, I want to see an error in case of invalid token id format specified in request payload @negative', async () => {
    const payload = { ...payloadTemplate };
    payload.format = 'something_special';
    const error = await walletNfts.getWalletNfts(payload, true);
    expect(error.message).toEqual('[C0006] Request failed, Bad Request(400): format must be a valid enum value');
});