import { filter } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TextInput, Platform } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenKeys } from '../../screens';
import { navigatorStandardOptions, leftButtonCancel } from '../../styles/navigator';
import { fetchActivities, fetchActivityById } from '../../api/activities';
import { retrieveRandomPlaceholder } from '../../ai/photosToOdhMapper';
import { PlatformTouchable } from '../../components/PlatformTouchable';
import { truncateString } from '../../utils/strUtils';

export interface IExperienceDetailProps extends ComponentEvent {
  activity: Activity;
}

interface IState {}

export default class ExperienceDetail extends Component<IExperienceDetailProps, IState> {
  constructor(props: IExperienceDetailProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { activity } = this.props;

    const title = activity.Detail.en ? activity.Detail.en.Title : activity.Shortname || 'Title not available';
    const address = activity.ContactInfos.en
      ? activity.ContactInfos.en.Address
      : activity.ContactInfos.de
      ? activity.ContactInfos.de.Address
      : activity.ContactInfos.it
      ? activity.ContactInfos.it.Address
      : '';

    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 34, color: '#44357F', marginTop: 40 }}>{title}</Text>
        {!!address && (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
            <FeatherIcon name="map-pin" size={16} color={Colors.BLACK} />
            <Text style={{ fontSize: 16, color: Colors.BLACK, paddingHorizontal: 4 }}>{address}</Text>
          </View>
        )}

        <Image
          source={
            activity.ImageGallery.length > 0
              ? { uri: activity.ImageGallery[0].ImageUrl }
              : { uri: retrieveRandomPlaceholder(activity.Type, activity.Id) }
          }
          style={{
            borderRadius: 8,
            marginTop: 26,
            height: 240,
            width: '100%'
          }}
        />
        {!!activity.GpsPoints.position && (
          <PlatformTouchable
            style={{ width: '100%', marginTop: 12 }}
            onPress={() => {
              Navigation.showModal({
                stack: {
                  children: [
                    {
                      component: {
                        name: ScreenKeys.mapOverlayScreen,
                        passProps: {
                          activity
                        },
                        options: {
                          topBar: {
                            title: {
                              text: truncateString(title, 20)
                            },
                            visible: true,
                            leftButtons: leftButtonCancel()
                          }
                        }
                      }
                    }
                  ]
                }
              });
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.BLACK
              }}
            >
              <FeatherIcon name="map" size={16} color={Colors.BLACK} />
              <Text style={{ fontSize: 16, color: Colors.BLACK, paddingHorizontal: 4 }}>Open Maps</Text>
            </View>
          </PlatformTouchable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.select({ android: 40, ios: 60 }),
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE
  },
  experienceCardContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    height: 190,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 24,
    shadowColor: Colors.BLACK,
    shadowOffset: { height: 0, width: 0 }
  },
  searchDivider: {
    marginHorizontal: 24,
    marginTop: 18,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.BLACK
  }
});
