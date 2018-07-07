import React, { Component } from "react";
import {
  Text,
  AppState,
  AsyncStorage,
  DeviceEventEmitter,
  PushNotificationIOS
} from "react-native";
import PushNotification from "react-native-push-notification";

import State from "@microstates/react";
import AppModel from "./models/app.js";
import { RootNavigator } from "./router";

let INITAL_STATE = {
  dosages: []
};

export default class App extends Component {
  state = {
    appState: {},
    hasLoaded: false,
    initalMedState: []
  };

  _handleAppStateChange = nextAppState => {
    this.setState({ appState: nextAppState });
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
  };

  handleModelChange = model => {
    AsyncStorage.setItem("dosages", JSON.stringify(model.dosages));
  };

  componentWillMount() {
    AsyncStorage.getItem("dosages").then(dosage => {
      if (dosage) {
        this.setState({
          hasLoaded: true,
          initalMedState: JSON.parse(dosage)
        });
      } else {
        this.setState({ hasLoaded: true });
      }
    });
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);

    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    let { initalMedState, hasLoaded } = this.state;
    let initalModelState = !!initalMedState.length
      ? { dosages: initalMedState }
      : INITAL_STATE;

    if (!hasLoaded) {
      return <Text>Loading...</Text>;
    }

    return (
      <State
        type={AppModel}
        value={initalModelState}
        onChange={this.handleModelChange}
      >
        {model => {
          return <RootNavigator screenProps={{ model }} />;
        }}
      </State>
    );
  }
}
