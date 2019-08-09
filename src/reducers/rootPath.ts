import { Action } from 'redux';
import { RootPathActionTypeKeys, RootPathActionTypes, RootPathState } from '../actions/rootPath';

export const initialState: RootPathState = {
    name: undefined
};

function rootPath(state: RootPathState = initialState, action: RootPathActionTypes): RootPathState {
    switch (action.type) {
        case RootPathActionTypeKeys.ROOT_CHANGED:
            return {
                name: action.payload
            };
        default:
            return state;
    }
}

export default (state: RootPathState = initialState, action: Action<string>) =>
    rootPath(state, action as RootPathActionTypes);
