import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ComponentEvent } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import Carousel from 'react-native-snap-carousel';
import { SliderEntry } from '../../components/SliderEntry';
import { ENTRIES2, DEMO } from '../../models/staticEntries';
import { sliderWidth, itemWidth } from '../../components/SliderEntry/SliderEntry';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';

export interface IDashboardProps extends ComponentEvent {
  activities: Activity[];
}

export default class Dashboard extends Component<IDashboardProps> {
  private swiper: any;

  render() {
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
        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
        >
          {DEMO.map((item, index) => (
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
          ))}
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
