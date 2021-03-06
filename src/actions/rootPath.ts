import { Action, ActionCreator } from 'redux';

export enum RootPathActionTypeKeys {
    ROOT_CHANGED = 'it.bz.insavacanza.ROOT_CHANGED',
    CACHE_PHOTOS = 'it.bz.instavacanza.CACHE_PHOTOS',
    CLEAR_CACHED_PHOTOS = 'it.bz.instavacanza.CLEAR_CACHED_PHOTOS',
}

export type RootPathActionTypes = IRootPathChanged | ICachePhotos | IClearCachePhotos;

export enum Paths {
    LOGIN = 'login',
    HOME = 'home'
}

export interface IRootPathChanged extends Action {
    type: RootPathActionTypeKeys.ROOT_CHANGED;
    payload: Paths;
}

export interface ICachePhotos extends Action {
    type: RootPathActionTypeKeys.CACHE_PHOTOS;
    payload: {
        gardensPhotos: any,
        holidaysPhotos: any,
        landscapesPhotos: any,
        sportPhotos: any,
        travelPhotos: any
    };
}

export interface IClearCachePhotos extends Action {
    type: RootPathActionTypeKeys.CLEAR_CACHED_PHOTOS;
}

export type RootPathState = {
    readonly name?: Paths;
    readonly cachedPhotos: {
        gardensPhotos?: any,
        holidaysPhotos?: any,
        landscapesPhotos?: any,
        sportPhotos?: any,
        travelPhotos?: any
    }
};

export type ChangePath = typeof changePath;
export const changePath: ActionCreator<IRootPathChanged> = (path: Paths) => {
    return {
        type: RootPathActionTypeKeys.ROOT_CHANGED,
        payload: path
    };
};

export type CachePhotos = typeof cachePhotos;
export const cachePhotos: ActionCreator<ICachePhotos> = (gardensPhotos: any,
    holidaysPhotos: any,
    landscapesPhotos: any,
    sportPhotos: any,
    travelPhotos: any) => {
    return {
        type: RootPathActionTypeKeys.CACHE_PHOTOS,
        payload: {
            gardensPhotos,
            holidaysPhotos,
            landscapesPhotos,
            sportPhotos,
            travelPhotos
        }
    };
};

export type ClearCachePhotos = typeof clearCachePhotos;
export const clearCachePhotos: ActionCreator<IClearCachePhotos> = () => {
    return {
        type: RootPathActionTypeKeys.CLEAR_CACHED_PHOTOS
    };
};
