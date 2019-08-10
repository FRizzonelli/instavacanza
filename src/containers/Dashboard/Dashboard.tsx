import { debounce } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Platform, BackHandler, NativeEventSubscription } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenKeys } from '../../screens';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { navigatorStandardOptions } from '../../styles/navigator';
import { PlatformTouchable } from '../../components/PlatformTouchable';
import { GoogleSignin } from 'react-native-google-signin';
import { ClearCachePhotos, clearCachePhotos } from '../../actions/rootPath';
import { RootState } from '../../reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface IDashboardProps extends ComponentEvent {
  activities?: Activity[];
  activitiesId?: { Id: string; Name: string }[];
  clearCachePhotos: ClearCachePhotos;
}

interface IState {
  matchedActivityIds: string[];
}

class Dashboard extends Component<IDashboardProps, IState> {
  private swiper: any;
  private backButtonSubscription?: NativeEventSubscription;

  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      matchedActivityIds: []
    };
  }

  componentDidMount() {
    this.backButtonSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.remove();
    }
  }

  handleBackButton = () => {
    return true;
  };

  render() {
    return (
      <LinearGradient colors={['#44357F', '#3C5A99']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.root}>
        <PlatformTouchable
          onPress={debounce(this.logout, 500, { leading: true, trailing: false })}
          style={{ position: 'absolute', top: 40, right: 16 }}
        >
          <FeatherIcon name="log-out" size={22} color={Colors.WHITE} />
        </PlatformTouchable>
        <CardStack
          loop={false}
          verticalSwipe={true}
          renderNoMoreCards={() => null}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
          ref={swiper => (this.swiper = swiper)}
        >
          {this.props.activitiesId &&
            this.props.activitiesId.map((item, index) => {
              return (
                <Card key={index}>
                  <CardItem
                    activityId={item.Id}
                    matches={false}
                    actions
                    onPressLeft={() => this.swiper.swipeLeft()}
                    onPressRight={() => this.swiper.swipeRight()}
                  />
                </Card>
              );
            })}
        </CardStack>
      </LinearGradient>
    );
  }

  private logout = async () => {
    await GoogleSignin.signOut();

    this.props.clearCachePhotos();
    
    Navigation.popToRoot(this.props.componentId);
  };

  private onSwipedLeft = (index: number) => {};

  private onSwipedRight = (index: number) => {
    const updatedMatchedActivites = [...this.state.matchedActivityIds, this.props.activitiesId![index].Id];

    this.setState(
      {
        matchedActivityIds: updatedMatchedActivites
      },
      () => {
        if (updatedMatchedActivites.length % 3 === 0) {
          Navigation.push(this.props.componentId, {
            component: {
              name: ScreenKeys.yourExperiencesScreen,
              options: navigatorStandardOptions({
                title: Platform.select({ ios: '', android: 'Experiences' }),
                visible: true
              }),
              passProps: {
                matchedActivityIds: updatedMatchedActivites
              }
            }
          });
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 80,
    paddingHorizontal: 16
  },
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  }
});

function mapStateToProps(state: RootState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      clearCachePhotos
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Dashboard);
