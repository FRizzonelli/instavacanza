import { Action, ActionCreator } from 'redux';

export enum RootPathActionTypeKeys {
    ROOT_CHANGED = 'it.bz.instavacanza.ROOT_CHANGED'
}

export type RootPathActionTypes = IRootPathChanged;

export enum Paths {
    LOGIN = 'login',
    HOME = 'home'
}

export interface IRootPathChanged extends Action {
    type: RootPathActionTypeKeys.ROOT_CHANGED;
    payload: Paths;
}

export type RootPathState = {
    readonly name?: Paths;
};

export type ChangePath = typeof changePath;
export const changePath: ActionCreator<IRootPathChanged> = (path: Paths) => {
    return {
        type: RootPathActionTypeKeys.ROOT_CHANGED,
        payload: path
    };
};
