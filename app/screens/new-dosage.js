import React, { Component } from "react";
import moment from "moment";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import State from "@microstates/react";

import Medication from "../models/medication";
import { headerStyle } from "../style";

class NewDosageScreen extends Component {
  static navigationOptions = {
    title: "Add Dosage",
    ...headerStyle
  };

  submitForm = model => {
    let AppModel = this.props.screenProps.model;
    let date = new Date();
    let timeTaken = model.state.timeTaken.split(":");
    date.setHours(timeTaken[0], timeTaken[1]);

    AppModel.dosages.push({
      name: model.state.name,
      dosage: model.state.dosage,
      timeTaken: date.toISOString(),
      dosageDuration: model.state.dosageDuration
    });

    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <State type={Medication} value={{}}>
        {model => {
          return (
            <View style={styles.background}>
              <View style={styles.formContainer}>
                <FormLabel>Name</FormLabel>
                <FormInput
                  onChangeText={text => model.name.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="Advil"
                />

                <FormLabel>Dosage:</FormLabel>
                <FormInput
                  onChangeText={text => model.dosage.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="200mg"
                />

                <FormLabel>Time Taken:</FormLabel>
                <FormInput
                  onChangeText={text => model.timeTaken.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder={`${moment().format("H:mm")}`}
                />

                <FormLabel>Duration (in hours):</FormLabel>
                <FormInput
                  onChangeText={text => model.dosageDuration.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="6"
                />

                <Button
                  raised={false}
                  backgroundColor="#84DCCF"
                  title="Submit"
                  style={styles.submitBtn}
                  disabled={!model.state.isValid}
                  onPress={() => this.submitForm(model)}
                />
              </View>
            </View>
          );
        }}
      </State>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#312F2F"
  },
  formContainer: {
    backgroundColor: "#f7f7f7",
    paddingTop: 20,
    paddingBottom: 50
  },
  inputStyle: {
    color: "black"
  },
  submitBtn: {
    marginTop: 25
  }
});

export default NewDosageScreen;
