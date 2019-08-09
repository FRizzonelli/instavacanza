import { Platform, Dimensions, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../../styles/colors';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export interface ICardItemProps {
  actions: any;
  description: string;
  image: any;
  matches: any;
  name: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  status: any;
  variant: any;
}

export default class CardItem extends Component<any> {
  render() {
    const { actions, description, image, matches, name, onPressLeft, onPressRight, status, variant } = this.props;

    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
      {
        borderRadius: 8,
        width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
        height: variant ? 170 : 350,
        margin: variant ? 0 : 20
      }
    ];

    const nameStyle = [
      {
        paddingTop: variant ? 10 : 15,
        paddingBottom: variant ? 5 : 7,
        color: '#363636',
        fontSize: variant ? 15 : 30
      }
    ];

    return (
      <View style={styles.containerCardItem}>
        {/* IMAGE */}
        <Image source={image} style={imageStyle} />

        {/* MATCHES */}
        {/* {matches && (
          <View style={styles.matchesCardItem}>
            <Text style={styles.matchesTextCardItem}>
              <FeatherIcon name="heart" /> {matches}% Match!
            </Text>
          </View>
        )} */}

        {/* NAME */}
        <Text style={nameStyle}>{name}</Text>

        {/* DESCRIPTION */}
        {description && <Text style={styles.descriptionCardItem}>{description}</Text>}

        {/* STATUS */}
        {/* {status && (
          <View style={styles.status}>
            <View style={status === 'Online' ? styles.online : styles.offline} />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )} */}

        {/* ACTIONS */}
        {actions && (
          <View style={styles.actionsCardItem}>
            <TouchableOpacity style={styles.miniButton}>
              <FeatherIcon name="star" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
              <FeatherIcon name="thumbs-up" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
              <FeatherIcon name="thumbs-down" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.miniButton}>
              <FeatherIcon name="zap" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCardItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: { height: 0, width: 0 }
  },
  descriptionCardItem: {
    color: Colors.GRAY_200,
    textAlign: 'center'
  },
  actionsCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: Colors.GRAY_500,
    shadowOffset: { height: 10, width: 0 }
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: Colors.GRAY_500,
    shadowOffset: { height: 10, width: 0 }
  }
});
