import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore as persistStoreRaw } from 'redux-persist';
import { Paths, RootPathActionTypeKeys } from './src/actions/rootPath';
import { RootState } from './src/reducers';
import registerScreens, { NavigationKeys, ScreenKeys } from './src/screens';
import configureStore from './src/store/configureStore';
import { Colors } from './src/styles/colors';
import { navigatorStandardOptions, bottomTabStandardOptions } from './src/styles/navigator';
import IconStorage from './src/utils/icons/iconStorage';

const store = configureStore() as Store<RootState>;

const initIcons = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      FeatherIcon.getImageSource('home', 24, '#fff')
    ])
      .then(values => {
        IconStorage.saveImage('home', values[0]);
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const applyNavigationDefaultOptions = () => {
  Navigation.setDefaultOptions({
    bottomTabs: {
      backgroundColor: Colors.WHITE
    },
    layout: {
      backgroundColor: Colors.WHITE,
      orientation: ['portrait']
    },
    statusBar: {
      backgroundColor: 'transparent',
      visible: true,
      drawBehind: true, // Only on Android
      style: 'light'
    },
    topBar: {
      noBorder: true
    }
  });
};

// promisify persistStore
const persistStore = (storeToPersit: Store<RootState>) =>
  new Promise(resolve => {
    persistStoreRaw(storeToPersit, undefined, async () => {
      store.subscribe(onStoreUpdate);
      resolve();
    });
  });

let currentRoot: Paths | undefined;

export const startApp = async () => {
  registerScreens(store, Provider);
  // persist store and w8 for app start simultaneously
  Navigation.events().registerAppLaunchedListener(async () => {
    // reset currentRoot
    currentRoot = undefined;

    await persistStore(store);
    await initIcons();

    applyNavigationDefaultOptions();

    const state = await AsyncStorage.getItem('persist:instavacanza.root');

    changeRootPath(Paths.LOGIN);
    // if (state) {
    //   changeRootPath(Paths.HOME);
    // } else {
    //   changeRootPath(Paths.LOGIN);
    // }
  });
};

const changeRootPath = (path: Paths) => {
  store.dispatch({
    type: RootPathActionTypeKeys.ROOT_CHANGED,
    payload: path
  });
};

const onStoreUpdate = async () => {
  const { rootPath } = store.getState();

  // handle a root change
  if (rootPath.name && currentRoot !== rootPath.name) {
    currentRoot = rootPath.name;

    setAppRoot(currentRoot);
  }
};

const setAppRoot = (root: Paths) => {
  applyNavigationDefaultOptions();

  switch (root) {
    default:
      return;
    case Paths.LOGIN:
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: ScreenKeys.loginScreen,
                  options: {
                    topBar: {
                      drawBehind: false,
                      elevation: 0,
                      background: {
                        color: Colors.FUSCHIA_500
                      }
                    },
                    statusBar: {
                      style: 'dark'
                    }
                  }
                }
              }
            ]
          }
        }
      });
      break;
    case Paths.HOME:
      Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: ScreenKeys.dashboardScreen,
                        options: navigatorStandardOptions({
                          title: 'Dashboard'
                        })
                      }
                    }
                  ],
                  options: bottomTabStandardOptions({
                    title: 'Dashboard',
                    icon: 'home',
                    selectedIcon: 'home'
                  })
                }
              }
            ]
          }
        }
      });
      break;
  }
};
