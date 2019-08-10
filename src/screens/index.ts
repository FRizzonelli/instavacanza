import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';
// import { NotificationBox } from '../components/overlays/NotificationBox';
import { RootState } from '../reducers';
import { Dashboard } from '../containers/Dashboard';
import { Login } from '../containers/Login';
import { YourExperiences } from '../containers/YourExperiences';
import { ExperienceDetail } from '../containers/ExperienceDetail';
import { VacationTime } from '../containers/VacationTime';
import { MapOverlay } from '../components/MapOverlay';

export enum ScreenKeys {
    dashboardScreen = 'it.bz.instavacanza.Dashboard',
    mapOverlayScreen = 'it.bz.instavacanza.MapOverlayScreen',
    yourExperiencesScreen = 'it.bz.instavacanza.YourExperiences',
    experienceDetailScreen = 'it.bz.instavacanza.ExperienceDetail',
    vacationTimeScreen = 'it.bz.instavacanza.VacationTime',
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
    Navigation.registerComponentWithRedux(ScreenKeys.mapOverlayScreen, () => MapOverlay, Provider, store);
    Navigation.registerComponentWithRedux(ScreenKeys.yourExperiencesScreen, () => YourExperiences, Provider, store);
    Navigation.registerComponentWithRedux(ScreenKeys.experienceDetailScreen, () => ExperienceDetail, Provider, store);
    Navigation.registerComponentWithRedux(ScreenKeys.vacationTimeScreen, () => VacationTime, Provider, store);
    Navigation.registerComponentWithRedux(ScreenKeys.loginScreen, () => Login, Provider, store);
    // Overlay
    // Navigation.registerComponent(OverlayKeys.notificationOverlay, () => NotificationBox);
    // Navigation
};
