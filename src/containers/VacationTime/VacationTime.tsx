import { delay, debounce } from 'lodash';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  Picker,
  Platform
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
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { MediaItem } from '../../models/mediaItem';
import LottieView from 'lottie-react-native';

export interface IVacationTimeProps extends ComponentEvent {
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
  isLoadingPhotos: boolean;
  isMatchingODHWithGoogle: boolean;
  pickedTime?: string;
}

class VacationTime extends Component<IVacationTimeProps, IState> {
  constructor(props: IVacationTimeProps) {
    super(props);
    this.state = {
      isLoadingPhotos: false,
      isMatchingODHWithGoogle: false,
      pickedTime: 'tomorrow'
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
    const { isLoadingPhotos, isMatchingODHWithGoogle } = this.state;

    if (isLoadingPhotos) {
      return (
        <LinearGradient
          colors={['#44357F', '#3C5A99']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.rootLoader}
        >
          <LottieView source={require('../../images/animation.json')} autoPlay loop />
          <Text style={{ fontSize: 22, color: Colors.WHITE, marginTop: 220 }}>
            {!isMatchingODHWithGoogle ? 'Learning from your Photos...' : 'Crafting your next experience...'}
          </Text>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={['#44357F', '#3C5A99']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.root}>
        <Text style={{ fontSize: 34, color: Colors.WHITE, marginBottom: 60 }}>{'Just tell us\nwhen:'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Picker
            selectedValue={this.state.pickedTime}
            style={{ height: 38, width: 200 }}
            itemStyle={{ color: Colors.WHITE, fontSize: 20 }}
            onValueChange={itemValue => this.setState({ pickedTime: itemValue })}
          >
            <Picker.Item label="today" value="today" />
            <Picker.Item label="tomorrow" value="tomorrow" />
            <Picker.Item label="next week" value="nextWeek" />
            <Picker.Item label="next month" value="nextMonth" />
          </Picker>
          <FeatherIcon name="chevron-down" size={20} color={Colors.WHITE} style={{ marginTop: 10 }} />
        </View>

        <PlatformTouchable
          onPress={debounce(this.downloadPhoto, 500, { leading: true, trailing: false })}
          style={{
            backgroundColor: Colors.WHITE,
            width: 280,
            height: 60,
            marginTop: 80,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 34, color: '#44357F' }}>Start exploring</Text>
        </PlatformTouchable>
        <Image source={require('../../images/clouds.png')} style={{ position: 'absolute', top: 0, right: 0 }} />
      </LinearGradient>
    );
  }

  downloadPhoto = async () => {
    try {
      this.setState({
        isLoadingPhotos: true
      });

      await GoogleSignin.signInSilently();

      const tokens = await GoogleSignin.getTokens();

      const gardensPhotos = await fetchAllPhotos(tokens.accessToken, 'GARDENS');
      const holidaysPhotos = await fetchAllPhotos(tokens.accessToken, 'HOLIDAYS');
      const landscapesPhotos = await fetchAllPhotos(tokens.accessToken, 'LANDSCAPES');
      const sportPhotos = await fetchAllPhotos(tokens.accessToken, 'SPORT');
      const travelPhotos = await fetchAllPhotos(tokens.accessToken, 'TRAVEL');

      this.props.cachePhotos(gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos);

      await this.retrieveODHData(gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos);
    } catch (error) {
      console.log(error);

      this.setState({
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

  private retrieveODHData = async (
    gardensPhotos: MediaItem[],
    holidaysPhotos: MediaItem[],
    landscapesPhotos: MediaItem[],
    sportPhotos: MediaItem[],
    travelPhotos: MediaItem[]
  ) => {
    this.setState({
      isMatchingODHWithGoogle: true
    });

    const filterCriteria = mapWithAILogic(gardensPhotos, holidaysPhotos, landscapesPhotos, sportPhotos, travelPhotos);

    const activitiesId = await fetchActivitiesBy(filterCriteria);

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

    delay(
      () =>
        this.setState({
          isLoadingPhotos: false,
          isMatchingODHWithGoogle: false
        }),
      200
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 38,
    justifyContent: 'center'
  },
  rootLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
)(VacationTime);
