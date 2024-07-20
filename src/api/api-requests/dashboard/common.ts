import axios, { AxiosRequestConfig, Method } from "axios";

export class DashboardCommon {
    private readonly requestOptions: AxiosRequestConfig;
    constructor() {
        this.requestOptions = {
            baseURL: 'http://api.dashboard.moralis.io',
            headers: {
                'Authorization': `Bearer ${this.getAccessToken()}`,
            },
            timeout: 5000,
        };
    }

    private getAccessToken() {
        const apiToken = process.env.API_KEY_BROWSER;
        if (!apiToken) throw new Error('No API token: "process.env.API_KEY_BROWSER" configured. Most probably was not set during login.')
        return apiToken;
    }

    public async sendRequest(method: Method, url: string, data?: any) {
        const options = this.requestOptions;
        options.url = url;
        options.method = method;
        options.data = data;
        const response = await axios(options)
            .then((response) => response)
            .catch((error) => {
                throw new Error(error.message)
            });

        return response;
    }
}