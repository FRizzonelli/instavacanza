import { Navigation } from 'react-native-navigation';
// import { NotificationType } from '../components/overlays/NotificationBox/NotificationBox';
import { OverlayKeys } from '../screens';

export enum NavigatorButtonIds {
    ADD = 'add',
    CANCEL = 'cancel',
    LOGOUT = 'logout',
    MORE = 'more',
    SEARCH = 'search',
    STOP = 'stop'
}

// export function showNotification(type: NotificationType, message: string, title?: string, dismissDuration?: number) {
//     Navigation.showOverlay({
//         component: {
//             name: OverlayKeys.notificationOverlay,
//             passProps: {
//                 type,
//                 title,
//                 message,
//                 dismissDuration
//             },
//             options: {
//                 statusBar: {
//                     style: 'light'
//                 },
//                 overlay: {
//                     interceptTouchOutside: false
//                 },
//                 layout: {
//                     backgroundColor: 'transparent'
//                 }
//             }
//         }
//     });
// }
