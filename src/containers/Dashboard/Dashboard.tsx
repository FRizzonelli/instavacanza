import { filter } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenKeys } from '../../screens';
import { navigatorStandardOptions } from '../../styles/navigator';

export interface IDashboardProps extends ComponentEvent {
  activities?: Activity[];
  activitiesId?: { Id: string; Name: string }[];
}

interface IState {
  matchedActivityIds: string[];
}

export default class Dashboard extends Component<IDashboardProps, IState> {
  private swiper: any;

  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      matchedActivityIds: []
    };
  }

  render() {
    return (
      <LinearGradient colors={['#44357F', '#3C5A99']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.root}>
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

  private onSwipedLeft = (index: number) => {};

  private onSwipedRight = (index: number) => {
    const updatedMatchedActivites = [...this.state.matchedActivityIds, this.props.activitiesId![index].Id];

    this.setState(
      {
        matchedActivityIds: updatedMatchedActivites
      },
      () => {
        if (updatedMatchedActivites.length >= 3) {
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
