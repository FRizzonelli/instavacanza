import { find } from 'lodash';
import { Platform, Dimensions, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Colors } from '../../styles/colors';
import { Activity } from '../../models/activity';

export interface IMapOverlayProps {
  activity: Activity;
}

export default class MapOverlay extends Component<IMapOverlayProps> {
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
