import find from 'lodash';
import { Platform, Dimensions, Image, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../../styles/colors';
import { Activity } from '../../models/activity';
import { fetchActivityById } from '../../api/activities';

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
  activityId?: string;
  actions: any;
  description?: string;
  image?: any;
  matches: any;
  name?: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  variant?: any;
}

interface IState {
  activity?: Activity;
}

export default class CardItem extends Component<ICardItemProps, IState> {
  constructor(props: ICardItemProps) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    if (this.props.activityId) {
      const activity = await fetchActivityById(this.props.activityId);
      this.setState({
        activity
      });
    }
  }

  render() {
    const { activityId, actions, description, image, matches, name, onPressLeft, onPressRight, variant } = this.props;

    const { activity } = this.state;

    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
      {
        borderRadius: 8,
        width: fullWidth - 48,
        height: 250,
        paddingBottom: 20
      }
    ];

    const nameStyle = [
      {
        paddingTop: 15,
        paddingBottom: 7,
        paddingHorizontal: 16,
        color: '#363636',
        fontWeight: '700',
        fontSize: 22
      }
    ];

    if (activityId && !activity) {
      return (
        <View style={styles.containerCardItem}>
          <View style={[imageStyle, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator color={Colors.FUSCHIA_500} />
          </View>
          {actions && (
            <View style={styles.actionsCardItem}>
              <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
                <FeatherIcon name="thumbs-down" size={18} color={Colors.WHITE} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
                <FeatherIcon name="thumbs-up" size={18} color={Colors.WHITE} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    } else if (activity) {
      const title = activity.Detail.en ? activity.Detail.en.Title : activity.Shortname || 'Title not available';
      const description =
        activity.Detail.en && activity.Detail.en.BaseText ? activity.Detail.en.BaseText.replace(/<[^>]*>?/gm, '') : '';

      return (
        <View style={styles.containerCardItem}>
          {/* IMAGE */}
          <Image
            source={
              activity.ImageGallery.length > 0 ? activity.ImageGallery[0].ImageUrl : require('../../images/01.jpg')
            }
            style={imageStyle}
          />

          {/* NAME */}
          <Text style={nameStyle} ellipsizeMode="tail" numberOfLines={2}>
            {title}
          </Text>

          {/* DESCRIPTION */}
          {!!description && (
            <Text style={styles.descriptionCardItem} ellipsizeMode="tail" numberOfLines={3}>
              {description}
            </Text>
          )}

          {/* ACTIONS */}
          {actions && (
            <View style={styles.actionsCardItem}>
              <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
                <FeatherIcon name="thumbs-down" size={18} color={Colors.WHITE} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
                <FeatherIcon name="thumbs-up" size={18} color={Colors.WHITE} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }

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
              <FeatherIcon name="thumbs-down" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
              <FeatherIcon name="thumbs-up" />
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
    margin: 10,
    height: Dimensions.get('window').height - 180,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { height: 0, width: 0 }
  },
  descriptionCardItem: {
    color: Colors.GRAY_600,
    paddingHorizontal: 16,
    fontSize: 17
    // textAlign: 'center'
  },
  actionsCardItem: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 30
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#44357F',
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
