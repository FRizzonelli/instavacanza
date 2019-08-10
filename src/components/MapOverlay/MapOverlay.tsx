import { find } from 'lodash';
import {
  Platform,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  BackHandler,
  NativeEventSubscription
} from 'react-native';
import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Colors } from '../../styles/colors';
import { Activity } from '../../models/activity';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Navigation, ComponentEvent, EventSubscription, NavigationButtonPressedEvent } from 'react-native-navigation';
import { NavigatorButtonIds } from '../../utils/navigation';

export interface IMapOverlayProps extends ComponentEvent {
  activity: Activity;
}

export default class MapOverlay extends Component<IMapOverlayProps> {
  private backButtonSubscription?: NativeEventSubscription;
  private navigationEventListener!: EventSubscription;

  componentDidMount() {
    this.backButtonSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.remove();
    }

    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  handleBackButton = () => {
    Navigation.dismissModal(this.props.componentId);
    return true;
  };

  navigationButtonPressed(event: NavigationButtonPressedEvent) {
    if (event.buttonId === NavigatorButtonIds.CANCEL) {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  render() {
    const { activity } = this.props;

    const coordinate = activity.GpsPoints.position;

    const title = activity.Detail.en ? activity.Detail.en.Title : activity.Shortname || 'Title not available';

    return (
      <MapView
        provider={Platform.select({ android: PROVIDER_GOOGLE, ios: undefined })} // remove if not using Google Maps
        style={{ ...StyleSheet.absoluteFillObject }}
        region={{
          latitude: coordinate.Latitude,
          longitude: coordinate.Longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinate.Latitude,
            longitude: coordinate.Longitude
          }}
          title={title}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({});
