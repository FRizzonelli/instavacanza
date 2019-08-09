import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ComponentEvent, Navigation } from 'react-native-navigation';
import { changePath, Paths, ChangePath } from '../../actions/rootPath';
import { Colors } from '../../styles/colors';
import { RootState } from '../../reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PlatformTouchable } from '../../components/PlatformTouchable';
import { ScreenKeys } from '../../screens';
import { navigatorStandardOptions } from '../../styles/navigator';

export interface ILoginProps extends ComponentEvent {
  changePath: ChangePath;
}

class Login extends Component<ILoginProps> {
  render() {
    return (
      <View style={styles.root}>
        <Text>Aiutaci a raccogliere i tuoi interessi 🙂</Text>
        <PlatformTouchable
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: ScreenKeys.dashboardScreen,
                options: navigatorStandardOptions({
                  title: 'Dashboard'
                })
              }
            });
          }}
        >
          <View style={styles.googleButton}>
            <Text>Login con Google</Text>
          </View>
        </PlatformTouchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  googleButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY_300
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
