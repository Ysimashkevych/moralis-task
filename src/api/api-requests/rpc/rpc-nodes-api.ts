import axios, { AxiosRequestConfig } from "axios";
import { error } from "node:console";

export class RPCNodesAPI {
    private requestOptions: AxiosRequestConfig;

    // TODO: create types for chain and methods possible to use
    constructor(chain = process.env.NODE_CHAIN, api_key = process.env.NODE_API_KEY) {
        this.requestOptions = {
            baseURL: 'https://site1.moralis-nodes.com',
            url: `/${chain}/${api_key}`,
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            data: {
                "jsonrpc": "2.0",
                "id": 1,
            },
            timeout: 5000,
        };
    }

    private async sendRequest(options: AxiosRequestConfig) {
        const response = await await axios(options).catch(error => {
            throw new Error(error.message);
        });

        return response;
    }

    public async getLatestBlockNumber() {
        const options = this.requestOptions;
        options.data.method = 'eth_blockNumber';
        return await this.sendRequest(options);
    }

    public async getBlockByNumber(block: 'latest' | 'earliest' | 'pending' | string, fullTransactionInformation = true) {
        const options = this.requestOptions;
        options.data.method = 'eth_getBlockByNumber';
        options.data.params = [
            block,
            fullTransactionInformation
        ]
        return await this.sendRequest(options);
    }

    public async getTransactionByHash(hash: string) {
        const options = this.requestOptions;
        options.data.method = 'eth_getTransactionByHash';
        options.data.params = [
            hash
        ]
        return await this.sendRequest(options);
    }
}