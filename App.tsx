import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
// import FontAwesomePro, { FA5Style } from 'react-native-vector-icons/FontAwesome5Pro';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore as persistStoreRaw } from 'redux-persist';
import { Paths, RootPathActionTypeKeys } from './src/actions/rootPath';
import { RootState } from './src/reducers';
import registerScreens, { NavigationKeys, ScreenKeys } from './src/screens';
import configureStore from './src/store/configureStore';
import { Colors } from './src/styles/colors';
import { navigatorStandardOptions, bottomTabStandardOptions } from './src/styles/navigator';

const store = configureStore() as Store<RootState>;

// const initIcons = async () => {
//   return new Promise((resolve, reject) => {
//     Promise.all([
//       require('../src/img/bottomTabs/dashboard-outline.png'),
//       require('../src/img/bottomTabs/dashboard.png'),
//       require('../src/img/bottomTabs/watch-outline.png'),
//       require('../src/img/bottomTabs/watch.png'),
//       require('../src/img/bottomTabs/expense-outline.png'),
//       require('../src/img/bottomTabs/expense.png'),
//       require('../src/img/bottomTabs/document-outline.png'),
//       require('../src/img/bottomTabs/document.png'),
//       FontAwesomePro.getImageSource('plus', 24, '#fff', FA5Style.light),
//       FontAwesomePro.getImageSource('times', 24, '#fff', FA5Style.light),
//       FontAwesomePro.getImageSource('ellipsis-v', 24, '#fff', FA5Style.light),
//       FontAwesomePro.getImageSource('ellipsis-h', 24, '#fff', FA5Style.light),
//       FontAwesomePro.getImageSource('search', 24, '#fff', FA5Style.light)
//     ])
//       .then(values => {
//         IconStorage.saveImage('dashboard-outline', values[0]);
//         IconStorage.saveImage('dashboard', values[1]);
//         IconStorage.saveImage('watch-outline', values[2]);
//         IconStorage.saveImage('watch', values[3]);
//         IconStorage.saveImage('expense-outline', values[4]);
//         IconStorage.saveImage('expense', values[5]);
//         IconStorage.saveImage('document-outline', values[6]);
//         IconStorage.saveImage('document', values[7]);
//         IconStorage.saveImage('plus', values[8]);
//         IconStorage.saveImage('cancel', values[9]);
//         IconStorage.saveImage('more-vertical', values[10]);
//         IconStorage.saveImage('more-horizontal', values[11]);
//         IconStorage.saveImage('search', values[12]);
//         resolve(true);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

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
    // await initIcons();

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
                    icon: 'dashboard-outline',
                    selectedIcon: 'dashboard'
                  })
                }
              }
              // {
              //   stack: {
              //     children: [
              //       {
              //         component: {
              //           name: ScreenKeys.timesheetScreen,
              //           options: navigatorStandardOptions({ title: 'Presenze' })
              //         }
              //       }
              //     ],
              //     options: bottomTabStandardOptions({
              //       title: 'Presenze',
              //       icon: 'watch-outline',
              //       selectedIcon: 'watch'
              //     })
              //   }
              // }
            ]
          }
        }
      });
      break;
  }
};
