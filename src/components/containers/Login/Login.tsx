import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { changePath, Paths, ChangePath } from '../../../actions/rootPath';
import { Colors } from '../../../styles/colors';
import { RootState } from '../../../reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface ILoginProps extends ComponentEvent {
  changePath: ChangePath;
}

class Login extends Component<ILoginProps> {
  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your
              edits.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>See Your Changes</Text>
            <Text style={styles.sectionDescription}>{/* <ReloadInstructions /> */}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.changePath(Paths.HOME);
                // Navigation.push(this.props.componentId, {

                // })
              }}
            >
              <Text style={styles.sectionTitle}>Dashboard</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Learn More</Text>
            <Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.WHITE
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.BLACK
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.GRAY_600
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.GRAY_600,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

function mapStateToProps(state: RootState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      changePath
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Login);
