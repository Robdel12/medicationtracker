import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native';

import State from '@microstates/react';
import AppModel from './models/app.js';
import { RootNavigator } from './router';

let INITAL_STATE = {
  medications: []
};

export default class App extends Component {
  state = {
    hasLoaded: false,
    initalMedState: []
  };

  handleModelChange = (model) => {
    AsyncStorage.setItem('medications', JSON.stringify(model.medications));
  }

  componentWillMount() {
    AsyncStorage.getItem('medications').then(meds => {
      if (meds) {
        this.setState({
          hasLoaded: true,
          initalMedState: JSON.parse(meds)
        });
      } else {
        this.setState({ hasLoaded: true });
      }
    })
  }

  render() {
    let {
      initalMedState,
      hasLoaded
    } = this.state;
    let initalModelState = !!initalMedState.length
        ? { medications: initalMedState }
        : INITAL_STATE;

    if (!hasLoaded) { return <Text>Loading...</Text>}

    return (
      <State type={AppModel} value={initalModelState} onChange={this.handleModelChange}>
        {model => {
          return (
            <RootNavigator screenProps={{model}} />
          );
        }}
      </State>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
