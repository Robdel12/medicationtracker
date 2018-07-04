import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { List, ListItem, Text, Button } from "react-native-elements";

class DosageShow extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.dosage.name
    };
  };

  removeDosage(currentDosage, model) {
    let filteredModel = model.dosages.filter(
      dosage => currentDosage !== dosage
    );

    model.dosages.set(filteredModel.state.dosages);
    this.props.navigation.navigate("Home");
  }

  render() {
    let { model } = this.props.screenProps;
    let { dosage } = this.props.navigation.state.params;

    return (
      <View>
        <Text>{dosage.dosage}</Text>
        <Text>Exprires {dosage.timeLeft}</Text>
        <Text>Time Taken: {dosage.displayTakenTime}</Text>
        <Text>Time Up: {dosage.timeUpDisplay}</Text>

        <Button
          title="Remove"
          onPress={() => this.removeDosage(dosage, model)}
        />
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
  listHeading: {
    fontSize: 14,
    marginTop: 25,
    marginLeft: 8,
    marginBottom: -15,
    color: "black"
  }
});

export default DosageShow;
