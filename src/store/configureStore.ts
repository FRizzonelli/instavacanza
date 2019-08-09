import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore, Reducer } from 'redux';
import { persistCombineReducers, PersistedState, persistReducer } from 'redux-persist';
import reducers, { RootState } from '../reducers';
// import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// import { NotificationType } from '../components/overlays/NotificationBox/NotificationBox';
// import reducers, { RootState } from '../reducers';
// import sagas from '../saga';
// import { reduxApiMiddlewareErrorHandler } from '../utils/errors';
// import { showNotification } from '../utils/navigation';

// const sagaMiddleware = createSagaMiddleware();
// const apiMiddlewareInterceptor = interceptor({
//     onRequestError: (_, response) => {
//         if (response.status_code >= 400 && response.status_code < 600) {
//             showNotification(NotificationType.ERROR, reduxApiMiddlewareErrorHandler(response));
//         }
//     }
// });
// const enhancer = applyMiddleware(thunk, apiMiddlewareInterceptor, apiMiddleware, sagaMiddleware);

const persistConfig = {
    timeout: 0,
    key: 'dic.root',
    storage: AsyncStorage,
    blacklist: ['documents', 'expenses', 'movements', 'payrolls']
};

const persistedReducer = persistCombineReducers<RootState>(persistConfig, reducers);

export default function configureStore(initalState?: RootState) {
    const store = createStore(persistedReducer, initalState);
    // sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(persistReducer(persistConfig, nextRootReducer) as Reducer<RootState & PersistedState>);
        });
    }
    return store;
}
