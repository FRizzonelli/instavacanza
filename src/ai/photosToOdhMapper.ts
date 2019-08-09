import { maxBy } from 'lodash'
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