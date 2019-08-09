import { Platform } from 'react-native';
import { AnimationOptions, Options, OptionsTopBarButton } from 'react-native-navigation';
import IconStorage from '../utils/icons/iconStorage';
import { NavigatorButtonIds } from '../utils/navigation';
import { Colors } from './colors';

export type DicOptions<T = {}> = {
    title: string;
    component?: {
        id?: string;
        name: string;
        alignment?: 'center' | 'fill';
        passProps?: T;
    };
    animations?: AnimationOptions
};

export const navigatorStandardOptions = <T>(opt: DicOptions<T>, leftButtons?: OptionsTopBarButton[], rightButtons?: OptionsTopBarButton[]): Options => {
    return {
        statusBar: {
            style: 'light',
            drawBehind: true
        },
        // This is working but lib is bugged, https://github.com/wix/react-native-navigation/issues/5138
        topBar: {
            title: {
                text: opt.title,
                color: Colors.WHITE,
            },
            rightButtonColor: Colors.WHITE,
            backButton: {
                color: Colors.WHITE
            },
            background: {
                color: Colors.FUSCHIA_500
            },
            leftButtons,
            rightButtons
        },
        animations: opt.animations
    };
};

export const navigatorHiddenBottomOptions = (opt: DicOptions): Options => {
    return {
        ...navigatorStandardOptions(opt),
        bottomTabs: {
            visible: false
        }
    };
};

export const navigatorStandardModalOptions = (opt: DicOptions): Options => {
    return navigatorStandardOptions(opt, leftButtonCancel());
};

export const navigatorSharedTranstionOptions = (fromId: string, toId: string): Options => {
    return {
        bottomTabs: {
            // animate: false,
            visible: false
        },
        topBar: {
            // animate: false,
            visible: false
        },
        animations: {
            push: {
                waitForRender: true,
                content: {
                    alpha: {
                        from: 1,
                        to: 1,
                        duration: 10
                    },
                    y: {
                        from: 0,
                        to: 0,
                        duration: 10
                    }
                }
            }
        },
        customTransition: {
            animations: [
                {
                    type: 'sharedElement',
                    fromId,
                    toId,
                    startDelay: 0,
                    springVelocity: 0.2,
                    duration: 0.3
                }
            ]
        }
    }
}

export const rightButtonAdd = () => {
    return Platform.select<OptionsTopBarButton[]>({
        android: [
            {
                id: NavigatorButtonIds.ADD,
                icon: IconStorage.getImage('plus')
            }
        ],
        ios: [
            {
                id: NavigatorButtonIds.ADD,
                color: Colors.WHITE,
                systemItem: 'add'
            }
        ]
    })
}

export const rightButtonSearch = () => {
    return Platform.select<OptionsTopBarButton[]>({
        android: [
            {
                id: NavigatorButtonIds.SEARCH,
                icon: IconStorage.getImage('search')
            }
        ],
        ios: [
            {
                id: NavigatorButtonIds.SEARCH,
                color: Colors.WHITE,
                systemItem: 'search'
            }
        ]
    })
}

export const rightButtonMore = (isDisabled: boolean = false) => {
    return [{
        id: NavigatorButtonIds.MORE,
        icon: Platform.select({ ios: IconStorage.getImage('more-horizontal'), android: IconStorage.getImage('more-vertical') }),
        disabled: isDisabled
    }]
}

export const rightButtonLogout = (isDisabled: boolean = false) => {
    return [{
        id: NavigatorButtonIds.LOGOUT,
        icon: Platform.select({ ios: IconStorage.getImage('more-horizontal') }),
        showAsAction: 'never',
        text: 'Logout',
        disabled: isDisabled
    }]
}

export const leftButtonCancel = () => {
    return Platform.select<OptionsTopBarButton[]>({
        android: [
            {
                id: NavigatorButtonIds.CANCEL,
                icon: IconStorage.getImage('cancel')
            }
        ],
        ios: [
            {
                id: NavigatorButtonIds.CANCEL,
                color: Colors.WHITE,
                systemItem: 'cancel'
            }
        ]
    })
}

type DicBottomTabOptions = {
    title: string;
    icon: string;
    selectedIcon: string;
};

export const bottomTabStandardOptions = (opt: DicBottomTabOptions): Options => {
    return {
        bottomTab: {
            text: opt.title,
            fontFamily: Platform.select({ android: 'Roboto' }),
            icon: IconStorage.getImage(opt.icon),
            selectedIcon: IconStorage.getImage(opt.selectedIcon),
            textColor: Colors.GRAY_600,
            iconColor: Colors.GRAY_600,
            selectedIconColor: Colors.BLUE_500,
            selectedTextColor: Colors.BLUE_500
        }
    };
};