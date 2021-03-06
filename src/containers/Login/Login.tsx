import { delay } from 'lodash';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { changePath, Paths, ChangePath, CachePhotos, cachePhotos } from '../../actions/rootPath';
import { Colors } from '../../styles/colors';
import { RootState } from '../../reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PlatformTouchable } from '../../components/PlatformTouchable';
import { ScreenKeys } from '../../screens';
import { navigatorStandardOptions } from '../../styles/navigator';
import { fetchActivities, fetchActivitiesBy } from '../../api/activities';
import to from 'await-to-js';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { fetchAlbums, fetchAllPhotos } from '../../api/photos';
import { mapWithAILogic } from '../../ai/photosToOdhMapper';
import LinearGradient from 'react-native-linear-gradient';
import { MediaItem } from '../../models/mediaItem';

export interface ILoginProps extends ComponentEvent {
  cachedPhotos: {
    gardensPhotos?: any;
    holidaysPhotos?: any;
    landscapesPhotos?: any;
    sportPhotos?: any;
    travelPhotos?: any;
  };
  changePath: ChangePath;
  cachePhotos: CachePhotos;
}

interface IState {
  isSigninInProgress: boolean;
  isLoadingPhotos: boolean;
  isMatchingODHWithGoogle: boolean;
}

class Login extends Component<ILoginProps, IState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      isLoadingPhotos: false,
      isMatchingODHWithGoogle: false
    };
  }

  async componentDidMount() {
    const { gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos } = this.props.cachedPhotos;

    // if (gardensPhotos) {
    //   this.setState({
    //     isLoadingPhotos: true
    //   });

    //   await this.retrieveODHData(gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos);
    // }
  }

  render() {
    return (
      <LinearGradient colors={['#44357F', '#3C5A99']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.root}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: Colors.WHITE,
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.6
          }}
        >
          <Image source={require('../../images/logo.png')} style={{ width: 106, height: 106 }} />
          <GoogleSigninButton
            style={{ width: 192, height: 48, marginTop: 62 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
          <Text style={{ fontSize: 17, color: '#44357F', marginTop: 20 }}>or</Text>
          <PlatformTouchable>
            <Text style={{ fontSize: 17, color: '#44357F', marginTop: 20, borderBottomWidth: 1 }}>
              Proceed without login
            </Text>
          </PlatformTouchable>
        </View>
      </LinearGradient>
    );
  }

  signIn = async () => {
    try {
      this.setState({
        isSigninInProgress: true
      });

      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/photoslibrary.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '200052756497-gnsckp63ka5qq7hmb560c57jep8nggb2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '200052756497-o12nntsmb99iq5it4nttcbqjbbn48tdj.apps.googleusercontent.com' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });

      await GoogleSignin.hasPlayServices();
      if (!(await GoogleSignin.isSignedIn())) {
        await GoogleSignin.signIn();
      }

      // go to screen time
      Navigation.push(this.props.componentId, {
        component: {
          name: ScreenKeys.vacationTimeScreen,
          options: navigatorStandardOptions({
            title: ''
          })
        }
      });

      this.setState({
        isSigninInProgress: false
      });
    } catch (error) {
      console.log(error);

      this.setState({
        isSigninInProgress: false,
        isLoadingPhotos: false,
        isMatchingODHWithGoogle: false
      });

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY_300
  }
});

function mapStateToProps(state: RootState) {
  return {
    cachedPhotos: state.rootPath.cachedPhotos
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      changePath,
      cachePhotos
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Login);
