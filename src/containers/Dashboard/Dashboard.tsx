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
  activities: Activity[];
}

export default class Dashboard extends Component<IDashboardProps> {
  private swiper: any;

  render() {
    console.log(this.props.activities);

    // const items = filter(this.props.activities, act => act.ImageGallery.length > 0);

    return (
      <View style={styles.root}>
        {/* <Carousel
          data={ENTRIES2}
          renderItem={this._renderLightItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout="tinder"
          loop={true}
        /> */}
        {/* {DEMO.map((item, index) => (
            <Card key={index}>
              <CardItem
                image={item.image}
                name={item.name}
                description={item.description}
                matches={false}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ))} */}
        <CardStack
          loop={false}
          verticalSwipe={true}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
        >
          {this.props.activities.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem
                  image={item.ImageGallery.length > 0 ? item.ImageGallery[0].ImageUrl : require('../../images/01.jpg')}
                  name={item.Shortname || 'short'}
                  description={item.Detail.length > 0 ? item.Detail[0].Title : 'Test'}
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

  // private _renderLightItem({ item, index }) {
  //   return <SliderEntry data={item} even={false} />;
  // }
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
