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
        if (!apiToken) throw new Error('No API token configured in the config file')
        return apiToken;
    }

    public async sendRequest(method: Method, url: string) {
        const options = this.requestOptions;
        options.url = url;
        options.method = method;
        const response = await axios(options)
            .then((response) => response)
            .catch((error) => {
                throw new Error(error.message)
            });

        return response;
    }
}