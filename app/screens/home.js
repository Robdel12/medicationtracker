import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Medication Tracker',
  };

  render() {
    let { model } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Button
          title="Add dosage"
          onPress={() => this.props.navigation.navigate('NewDosage')} />

          {model.state.medications.map((medication, index) => {
          return (
            <View key={index} style={styles.cardContainer}>
              <Text>Name: {medication.name}</Text>
              <Text>Time Taken: {medication.displayTakenTime}</Text>
              <Text>Time Up: {medication.timeUpDisplay} {medication.hasExpired && '(expired)'}</Text>
            </View>
          );
        })}
      </View>
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
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10
  }
});

export default HomeScreen;
