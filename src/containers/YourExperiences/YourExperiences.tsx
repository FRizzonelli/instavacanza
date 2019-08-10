import { filter } from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TextInput } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { Colors } from '../../styles/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { DEMO } from '../../models/staticEntries';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { CardItem } from '../../components/CardItem';
import { Activity } from '../../models/activity';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenKeys } from '../../screens';
import { navigatorStandardOptions } from '../../styles/navigator';
import { fetchActivities, fetchActivityById } from '../../api/activities';
import { retrieveRandomPlaceholder } from '../../ai/photosToOdhMapper';

export interface IYourExperiencesProps extends ComponentEvent {
  matchedActivityIds: string[];
}

interface IState {
  activities: Activity[];
}

export default class YourExperiences extends Component<IYourExperiencesProps, IState> {
  constructor(props: IYourExperiencesProps) {
    super(props);
    this.state = {
      activities: []
    };
  }

  async componentDidMount() {
    for (let i = 0; i < this.props.matchedActivityIds.length; i++) {
      const act = await fetchActivityById(this.props.matchedActivityIds[i]);

      this.setState({
        activities: [...this.state.activities, act]
      });
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 34, color: '#44357F', marginTop: 40, paddingHorizontal: 24 }}>Liked experiences</Text>
        <View style={styles.searchDivider}>
          <TextInput style={{ fontSize: 17, color: Colors.BLACK }} placeholder="Search..." />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12, width: '100%' }} />}
          contentContainerStyle={{ backgroundColor: Colors.WHITE, paddingBottom: 16 }}
          data={this.state.activities}
          renderItem={({ item, index }) => this.renderExperienceActivity(item)}
          keyExtractor={(_, index) => String(index)}
        />
      </View>
    );
  }

  private renderExperienceActivity = (activity: Activity) => {
    const title = activity.Detail.en ? activity.Detail.en.Title : activity.Shortname || 'Title not available';
    const address = activity.ContactInfos.en
      ? activity.ContactInfos.en.Address
      : activity.ContactInfos.de
      ? activity.ContactInfos.de.Address
      : activity.ContactInfos.it
      ? activity.ContactInfos.it.Address
      : '';

    return (
      <View style={styles.experienceCardContainer}>
        <Image
          source={
            activity.ImageGallery.length > 0
              ? { uri: activity.ImageGallery[0].ImageUrl }
              : { uri: retrieveRandomPlaceholder(activity.Type, activity.Id) }
          }
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            height: 120,
            width: '100%'
          }}
        />
        <View style={{ height: 70, paddingHorizontal: 16, justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, color: Colors.BLACK }} ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>
          {!!address && (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
              <FeatherIcon name="map-pin" size={16} color={Colors.BLACK} />
              <Text style={{ fontSize: 16, color: Colors.BLACK, paddingHorizontal: 4 }}>{address}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
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
