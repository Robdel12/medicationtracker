import React, { Component } from 'react';
import moment from 'moment';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import State from '@microstates/react';
import Medication from '../models/medication';

class NewDosageScreen extends Component {
  static navigationOptions = {
    title: 'Add Dosage',
  };

  submitForm = (model) => {

    let AppModel = this.props.screenProps.model;
    let date = new Date();
    let timeTaken = model.state.timeTaken.split(':');
    date.setHours(timeTaken[0], timeTaken[1]);

    AppModel.medications.push({
      name: model.state.name,
      timeTaken: date.toISOString(),
      dosageDuration: model.state.dosageDuration
    });

    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <State type={Medication} value={{}}>
        {model => {
          console.log(model.state.isValid);
          return (
            <View style={styles.container}>
              <Text>Name:</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => model.name.set(text)}
                placeholder="Advil"
                value={model.state.name} />

                <Text>Time Taken:</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(text) => model.timeTaken.set(text)}
                  placeholder={`${moment().format('H:mm')}`}
                  value={model.state.timeTaken} />

                  <Text>Duration (in hours):</Text>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => model.dosageDuration.set(text)}
                    placeholder="6"
                    value={model.state.dosageDuration} />

                    <Button
                      title="Submit"
                      style={styles.submitBtn}
                      disabled={!model.state.isValid}
                      onPress={()=> this.submitForm(model)} />
            </View>
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
  inputStyle: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: 'gray'
  }
});

export default NewDosageScreen;
