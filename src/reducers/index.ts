import { ReducersMapObject } from "redux";
import { RootPathState } from "../actions/rootPath";
import rootPath from './rootPath';

export type RootState = {
    rootPath: RootPathState;
}


// export type AllAction = AuthActionTypes | DocumentActionTypes | ExpenseActionTypes | MovementActionTypes | PayrollActionTypes | RootPathActionTypes | UsersActionTypes | VehicleActionTypes;

// export type ThunkResult<T> = ThunkAction<Promise<T>, RootState, {}, AllAction>;
// export type RSSAThunkResult<T, A> = RSAThunkAction<Promise<T>, RootState, {}, AllAction | A>;

const reducers: ReducersMapObject<RootState, any> = {
    rootPath
};

export default reducers;