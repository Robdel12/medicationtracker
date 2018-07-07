import React, { Component } from "react";
import { Text, AsyncStorage } from "react-native";

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
