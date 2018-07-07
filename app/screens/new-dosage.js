import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, DatePickerIOS } from "react-native";
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
      title: `${formModel.state.name} is almost up`, // (optional)
      message: `Your dosage for ${formModel.state.name} is almost up.`, // (required)
      date: formModel.state.notificationDate
    });

    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <State type={Medication} value={{ timeTaken: new Date() }}>
        {formModel => {
          return (
            <View style={styles.background}>
              <View style={styles.formContainer}>
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

                <FormLabel>Time Taken:</FormLabel>
                <DatePickerIOS
                  date={formModel.state.timeTaken || new Date()}
                  onDateChange={date => formModel.timeTaken.set(date)}
                />

                <FormLabel>Duration (in hours):</FormLabel>
                <FormInput
                  onChangeText={text => formModel.dosageDuration.set(text)}
                  inputStyle={styles.inputStyle}
                  placeholder="6"
                />

                <Button
                  raised={false}
                  backgroundColor="#84DCCF"
                  title="Submit"
                  style={styles.submitBtn}
                  disabled={!formModel.state.isValid}
                  onPress={() => this.submitForm(formModel)}
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
