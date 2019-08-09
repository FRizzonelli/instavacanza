import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { changePath, Paths, ChangePath } from '../../actions/rootPath';
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

export interface ILoginProps extends ComponentEvent {
  changePath: ChangePath;
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

  render() {
    return (
      <View style={styles.root}>
        <Text>Aiutaci a raccogliere i tuoi interessi 🙂</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48, marginTop: 18 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
          disabled={this.state.isSigninInProgress}
        />
      </View>
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

      this.setState({
        isLoadingPhotos: true
      });

      const tokens = await GoogleSignin.getTokens();

      const gardensPhotos = await fetchAllPhotos(tokens.accessToken, 'GARDENS');
      const holidaysPhotos = await fetchAllPhotos(tokens.accessToken, 'HOLIDAYS');
      const landscapesPhotos = await fetchAllPhotos(tokens.accessToken, 'LANDSCAPES');
      const sportPhotos = await fetchAllPhotos(tokens.accessToken, 'SPORT');
      const travelPhotos = await fetchAllPhotos(tokens.accessToken, 'TRAVEL');

      this.setState({
        isMatchingODHWithGoogle: true
      });

      const filterCriteria = mapWithAILogic(gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos);

      const activitiesId = await fetchActivitiesBy(filterCriteria);

      console.log(activitiesId);

      Navigation.push(this.props.componentId, {
        component: {
          name: ScreenKeys.dashboardScreen,
          options: navigatorStandardOptions({
            title: 'Dashboard'
          }),
          passProps: {
            activitiesId
          }
        }
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

  private rerieveGoogleData = async () => {
    // Mettere qui fetch a google

    const [error, activities] = await to(fetchActivities());

    if (activities) {
      Navigation.push(this.props.componentId, {
        component: {
          name: ScreenKeys.dashboardScreen,
          options: navigatorStandardOptions({
            title: 'Dashboard'
          }),
          passProps: {
            activities
          }
        }
      });
    }
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  googleButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY_300
  }
});

function mapStateToProps(state: RootState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      changePath
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
