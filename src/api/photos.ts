import to from "await-to-js";
import { fetchGoogle } from "./googleFetcher";

export async function fetchAlbums(accessToken: string): Promise<any> {
    const [error, response] = await to(
        fetchGoogle<any>(`https://photoslibrary.googleapis.com/v1/albums`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    );

    if (!response) {
        throw error;
    }

    return response.albums;
}

export type GOOGLE_PHOTO_CATEGORY = "LANDSCAPES" | "GARDENS" | "TRAVEL" | "HOLIDAYS" | "SPORT";
export async function fetchAllPhotos(accessToken: string, category: GOOGLE_PHOTO_CATEGORY): Promise<any> {
    const [error, response] = await to(
        fetchGoogle<any>(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                pageSize: "100",
                filters: {
                    contentFilter: {
                        includedContentCategories: [
                            category
                        ]
                    }
                }
            })
        })
    );

    if (!response) {
        throw error;
    }

    console.log(response);


    return response.mediaItems;
}
