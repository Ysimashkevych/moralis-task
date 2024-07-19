import { APIRequest, APIRequestContext, expect } from "@playwright/test";
import { DashboardCommon } from "./common";
import axios from "axios";

export class DashboardNodesAPI extends DashboardCommon {
    private apiUrl: string;
    token: string;

    constructor() {
        super();
        this.apiUrl = '/project/nodes';
    }

    public async getListOFAvailableNodes() {
        const response = await this.sendRequest('GET', this.apiUrl);
        if (response.status !== 200) {
            throw new Error(`List of available nodes was not obtained. Response failed with status ${response.status} ${response.statusText}`);
        }
        return response.data;
    }

    public async deleteNodeByKey(key: string) {
        const URL = `${this.apiUrl}/${key}`;
        const response = await this.sendRequest('DELETE', URL);
        if (response.status !== 200) {
            throw new Error(`Node with key: "${key}" has not been deleted. Response failed with status ${response.status} ${response.statusText}`);
        }
    }
}