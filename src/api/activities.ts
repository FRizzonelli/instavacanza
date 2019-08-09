import { fetchODHApi } from "./openDataHubFetcher";
import { API_SERVER_URL } from "../config/apiServer";
import to from "await-to-js";
import { Activity, FilterCriteria } from "../models/activity";
import { OdhResponse } from "../models/odhResponse";

export async function fetchActivityById(id: string): Promise<Activity> {
    const [error, response] = await to(
        fetchODHApi<Activity>(`${API_SERVER_URL}/api/Activity/${id}`, {
            method: 'GET'
        })
    );

    if (!response) {
        throw error;
    }

    return response;
}

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

// 'Mountains = 1','Cycling = 2','Local tours = 4','Horses = 8','Hiking = 16',
// 'Running and fitness = 32','Cross-country ski-track = 64','Tobbogan run = 128','Slopes = 256','Lifts = 512'
export async function fetchActivitiesBy(filterCriteria: FilterCriteria): Promise<{ Id: string, Name: string }[]> {
    const [error, response] = await to(
        fetchODHApi<Array<{ Id: string, Name: string }>>(`${API_SERVER_URL}/api/ActivityReduced?pagesize=30&active=true&activitytype=${retrieveActivityTypeByFilterCriteria(filterCriteria)}`, {
            method: 'GET'
        })
    );

    if (!response) {
        throw error;
    }

    return response;
}

function retrieveActivityTypeByFilterCriteria(filterCriteria: FilterCriteria) {
    switch (filterCriteria.favoriteCategory) {
        default:
            return '1023' // ALL types
        case "GARDENS":
            return '13';
        case "HOLIDAYS":
            return '1023';
        case "LANDSCAPES":
            return '31';
        case "SPORT":
            return '992';
        case "TRAVEL":
            return '31';
    }
}