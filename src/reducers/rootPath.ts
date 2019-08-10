import { Action } from 'redux';
import { RootPathActionTypeKeys, RootPathActionTypes, RootPathState } from '../actions/rootPath';

export const initialState: RootPathState = {
    name: undefined,
    cachedPhotos: {
        gardensPhotos: undefined,
        holidaysPhotos: undefined,
        landscapesPhotos: undefined,
        sportPhotos: undefined,
        travelPhotos: undefined
    }
};

function rootPath(state: RootPathState = initialState, action: RootPathActionTypes): RootPathState {
    switch (action.type) {
        case RootPathActionTypeKeys.ROOT_CHANGED:
            return {
                ...state,
                name: action.payload,
            };
        case RootPathActionTypeKeys.CACHE_PHOTOS:
            return {
                ...state,
                cachedPhotos: action.payload
            }
        default:
            return state;
    }
}

export default (state: RootPathState = initialState, action: Action<string>) =>
    rootPath(state, action as RootPathActionTypes);
