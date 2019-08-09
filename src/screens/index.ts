import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';
// import { NotificationBox } from '../components/overlays/NotificationBox';
import { RootState } from '../reducers';
import { Dashboard } from '../components/containers/Dashboard';
import { Login } from '../components/containers/Login';

export enum ScreenKeys {
    dashboardScreen = 'it.bz.instavacanza.Dashboard',
    loginScreen = 'it.bz.instavacanza.Login',
}

export enum OverlayKeys {
    notificationOverlay = 'it.bz.instavacanza.Notification',
}

export enum NavigationKeys {
}

export default (store: Store<RootState | undefined>, provider: typeof Provider) => {
    // Screens
    Navigation.registerComponentWithRedux(ScreenKeys.dashboardScreen, () => Dashboard, Provider, store);
    Navigation.registerComponentWithRedux(ScreenKeys.loginScreen, () => Login, Provider, store);
    // Overlay
    // Navigation.registerComponent(OverlayKeys.notificationOverlay, () => NotificationBox);
    // Navigation
};
