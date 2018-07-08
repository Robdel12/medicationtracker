import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  ScrollView,
  DatePickerIOS,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import PushNotification from "react-native-push-notification";
import State from "@microstates/react";
import moment from "moment";

import Medication from "../models/medication";
import { headerStyle } from "../style";

class NewDosageScreen extends Component {
  static navigationOptions = {
    title: "Add Dosage",
    ...headerStyle
  };

  state = {
    showPicker: false
  };

  handlePickerTap = () => {
    Keyboard.dismiss();

    this.setState(prevState => ({
      showPicker: !prevState.showPicker
    }));
  };

  submitForm = formModel => {
    let AppModel = this.props.screenProps.model;
    let currentDate = new Date();
    let newDosage = {
      name: formModel.state.name,
      dosage: formModel.state.dosage,
      timeTaken: formModel.state.timeTaken,
      dosageDuration: formModel.state.dosageDuration
    };

    AppModel.dosages.push(newDosage);

    PushNotification.localNotificationSchedule({
      message: `Your dosage ${formModel.state.name} will expire at ${
        formModel.state.timeUpDisplay
      }`,
      date: formModel.state.notificationDate,
      userInfo: { newDosage }
    });

    this.props.navigation.navigate("Home");
  };

  // TODO Refactor to use a form model microstate rather than the medication model directly
  render() {
    return (
      <State type={Medication} value={{ timeTaken: new Date() }}>
        {formModel => {
          return (
            <ScrollView style={styles.background}>
              <KeyboardAvoidingView
                style={styles.formContainer}
                enabled
                behavior="padding"
              >
                <FormLabel>Name</FormLabel>
                <FormInput
                  onChangeText={text => formModel.name.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="Advil"
                />

                <FormLabel>Dosage:</FormLabel>
                <FormInput
                  onChangeText={text => formModel.dosage.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="200mg"
                />

                <FormLabel>Duration (in hours):</FormLabel>
                <FormInput
                  onChangeText={text => formModel.dosageDuration.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="6"
                />

                <FormLabel>Time Taken:</FormLabel>
                <Button
                  backgroundColor="transparent"
                  title={formModel.state.displayTakenTime}
                  textStyle={{ color: "black" }}
                  buttonStyle={styles.takenTimeBtn}
                  rightIcon={{
                    color: "black",
                    name: this.state.showPicker
                      ? "arrow-drop-up"
                      : "arrow-drop-down",
                    size: 25
                  }}
                  onPress={this.handlePickerTap}
                />

                {this.state.showPicker && (
                  <DatePickerIOS
                    date={formModel.state.timeTaken}
                    maximumDate={new Date()}
                    mode="time"
                    onDateChange={date => formModel.timeTaken.set(date)}
                  />
                )}

                <Button
                  raised={false}
                  backgroundColor="#84DCCF"
                  title="Submit"
                  style={styles.submitBtn}
                  disabled={!formModel.state.isValid}
                  onPress={() => this.submitForm(formModel)}
                />
              </KeyboardAvoidingView>
            </ScrollView>
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
    paddingBottom: 50,
    minHeight: 500
  },
  inputStyle: {
    color: "black"
  },
  takenTimeBtn: {
    borderWidth: 0.5,
    borderColor: "#312F2F",
    marginTop: 12,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 4
  },
  submitBtn: {
    marginTop: 25
  }
});

export default NewDosageScreen;
