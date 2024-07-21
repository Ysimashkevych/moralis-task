import Moralis from "moralis";
import { MoralisError } from "moralis/common-core";
import { GetWalletNFTsJSONRequest, GetWalletNFTsJSONResponse, GetWalletNFTsResponseAdapter } from "moralis/common-evm-utils";

export class WalletNfts {
    private apiKey: string | undefined;
    constructor(apiKey = process.env.API_KEY) {
        this.apiKey = apiKey;
    }

    public async init() {
        await Moralis.start({ apiKey: this.apiKey }).catch(error => {
            throw new Error(error);
        });
    }

    public async getWalletNfts(request, returnError = false): Promise<GetWalletNFTsJSONResponse & MoralisError> {
        const response = await Moralis.EvmApi.nft.getWalletNFTs(request)
            .then(response => response.toJSON())
            .catch(error => {
                if (returnError) {
                    return error;
                } else {
                    throw new Error(error);
                }
            });

        return response;
    }
}