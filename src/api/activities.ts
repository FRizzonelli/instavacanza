import { fetchODHApi } from "./openDataHubFetcher";
import { API_SERVER_URL } from "../config/apiServer";
import to from "await-to-js";
import { Activity } from "../models/activity";
import { OdhResponse } from "../models/odhResponse";

export async function fetchActivities(): Promise<Activity[]> {
    const [error, response] = await to(
        fetchODHApi<OdhResponse<Activity>>(`${API_SERVER_URL}/api/Activity?pagesize=20`, {
            method: 'GET'
        })
    );

    if (!response) {
        throw error;
    }

    return response.Items;
}

export async function fetchActivitiesBy(): Promise<Activity[]> {
    const [error, response] = await to(
        fetchODHApi<OdhResponse<Activity>>(`${API_SERVER_URL}/api/ActivityReduced`, {
            method: 'GET'
        })
    );

    if (!response) {
        throw error;
    }

    return response.Items;
}