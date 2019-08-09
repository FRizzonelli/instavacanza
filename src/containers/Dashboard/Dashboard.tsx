import { filter } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ComponentEvent } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';
import LinearGradient from 'react-native-linear-gradient';

export interface IDashboardProps extends ComponentEvent {
  activities?: Activity[];
  activitiesId?: { Id: string; Name: string }[];
}

export default class Dashboard extends Component<IDashboardProps> {
  private swiper: any;

  render() {
    return (
      <LinearGradient colors={['#44357F', '#3C5A99']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.root}>
        <CardStack
          loop={false}
          verticalSwipe={true}
          renderNoMoreCards={() => null}
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
