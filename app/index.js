import React, { Component } from "react";
import {
  Text,
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
    hasLoaded: false,
    initalMedState: []
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
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });
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
