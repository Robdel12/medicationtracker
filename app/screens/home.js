import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Medication Tracker",
      headerRight: (
        <Button title="Add" onPress={() => navigation.navigate("NewDosage")} />
      )
    };
  };

  render() {
    let { model } = this.props.screenProps;

    return (
      <View>
        <List>
          {model.state.medications.map((medication, index) => {
            let expiredText = medication.hasExpired ? "(expired)" : null;

            return (
              <ListItem
                key={index}
                title={medication.name}
                hideChevron
                subtitle={`${medication.dosage} * ${
                  medication.displayTakenTime
                }`}
              />
            );
          })}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10
  }
});

export default HomeScreen;
