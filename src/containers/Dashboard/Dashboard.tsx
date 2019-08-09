import { filter } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ComponentEvent } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';

export interface IDashboardProps extends ComponentEvent {
  activities?: Activity[];
  activitiesId?: { Id: string; Name: string }[];
}

export default class Dashboard extends Component<IDashboardProps> {
  private swiper: any;

  render() {
    return (
      <View style={styles.root}>
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
                    // image={
                    //   item.ImageGallery.length > 0 ? item.ImageGallery[0].ImageUrl : require('../../images/01.jpg')
                    // }
                    // name={item.Shortname || 'short'}
                    // description={item.Detail.length > 0 ? item.Detail[0].Title : 'Test'}
                    matches={false}
                    actions
                    onPressLeft={() => this.swiper.swipeLeft()}
                    onPressRight={() => this.swiper.swipeRight()}
                  />
                </Card>
              );
            })}
        </CardStack>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  }
});
