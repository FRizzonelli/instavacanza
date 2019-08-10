import { maxBy, sumBy } from 'lodash'
import { MediaItem } from "../models/mediaItem";
import { Activity, FilterCriteria } from "../models/activity";
import { GOOGLE_PHOTO_CATEGORY } from '../api/photos';

export function mapWithAILogic(gardensPhotos: MediaItem[], holidaysPhotos: MediaItem[], landscapesPhotos: MediaItem[], sportPhotos: MediaItem[], travelPhotos: MediaItem[]): FilterCriteria {
    const favoriteCategoryByGoogle = maxBy([{
        id: "GARDENS",
        count: gardensPhotos.length
    }, {
        id: "HOLIDAYS",
        count: holidaysPhotos.length
    }, {
        id: "LANDSCAPES",
        count: landscapesPhotos.length
    }, {
        id: "SPORTS",
        count: sportPhotos.length
    }, {
        id: "TRAVEL",
        count: travelPhotos.length
    }], item => item.count);

    return {
        favoriteCategory: favoriteCategoryByGoogle && favoriteCategoryByGoogle.id as GOOGLE_PHOTO_CATEGORY
    }
}

export function retrieveRandomPlaceholder(activityType: string, id: string): string {
    const randomById = sumBy(id, char => isNaN((Number(char))) ? 0 : Number(char)) % 4;

    switch (activityType) {
        default:
        case "Berg": // Mountains
            const mountainsPlaceholders =
                ["https://images.unsplash.com/photo-1556300936-48a075accaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1534103362078-d07e750bd0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1502054107195-7bed90be084a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1557064348-ad29cacfb9c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1563229582-1455d62ba039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"];

            return mountainsPlaceholders[randomById];
        case "Radfahren": // Cycling
            const cyclingPlaceholders =
                ["https://images.unsplash.com/photo-1560982715-2c5936185c63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1508789454646-bef72439f197?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1545058746-b3cb62c0b05c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1545058802-67e0e08922fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1497514789819-4190972b5575?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]


            return cyclingPlaceholders[randomById];
        case "Stadtrundgang": // Local tours
            const localToursPlaceholders =
                ["https://images.unsplash.com/photo-1547669662-3c9d2e0d4ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://www.gallorosso.it/smartedit/images/hoefe/vergroesserung/144006210-3644-neu.jpg",
                    "https://www.altoadige-tirolo.com/media/tscherms-3,16769575.jpg",
                    "https://www.altoadige-tirolo.com/media/meran-10,437227250.jpg",
                    "http://www.rebenhof.it/images/big/1_von_33.jpg"]

            return localToursPlaceholders[randomById];
    }
}

function getRandomId() {
    const min = 1;
    const max = 5
    return (Math.floor(Math.random() * (+max - +min)) + +min) - 1;
}