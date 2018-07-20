import React, { Component } from "react";
import {
  Text,
  View,
  AppState,
  AsyncStorage,
  DeviceEventEmitter,
  PushNotificationIOS
} from "react-native";
import PushNotification from "react-native-push-notification";
import State from "@microstates/react";
import { create } from "microstates";
import iCloudStorage from "react-native-icloudstore";

import AppModel from "./models/app.js";
import MedicationModel from "./models/medication";
import { RootNavigator } from "./router";
import NavigationService from "./router/navigation-service";

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
    // for now just setting the state is enough to make sure expired
    // items render correctly
    this.setState({ appState: nextAppState });
  };

  handleModelChange = model => {
    AsyncStorage.setItem("dosages", JSON.stringify(model.dosages));
    iCloudStorage.setItem("medtracker:dosages", JSON.stringify(model.dosages));
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
        // there's only one push notification right now.
        // Send it to one place
        if (notification.userInteraction) {
          let dosage = create(MedicationModel, notification.data.newDosage);

          NavigationService.navigate("DosageShow", {
            dosage: dosage.state
          });
        }

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });

    let subscription = DeviceEventEmitter.addListener(
      "quickActionShortcut",
      data => {
        if (data.title === "Add Dosage") {
          NavigationService.navigate("NewDosage");
        }
      }
    );
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
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#312F2F",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
        </View>
      );
    }

    return (
      <State
        type={AppModel}
        value={initalModelState}
        onChange={this.handleModelChange}
      >
        {model => {
          return (
            <RootNavigator
              screenProps={{ model }}
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          );
        }}
      </State>
    );
  }
}
