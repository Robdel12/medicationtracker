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
      <View style={styles.showContainer}>
        <Text style={styles.showText}>{dosage.dosage}</Text>
        <Text style={styles.showText}>Exprires {dosage.timeLeft}</Text>
        <Text style={styles.showText}>
          Time Taken: {dosage.displayTakenTime}
        </Text>
        <Text style={styles.showText}>Time Up: {dosage.timeUpDisplay}</Text>

        <Button
          title="Remove"
          style={styles.removeBtn}
          onPress={() => this.removeDosage(dosage, model)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showContainer: {
    padding: 20
  },
  showText: {
    fontSize: 18,
    marginBottom: 8
  },
  removeBtn: {
    marginTop: 20
  }
});

export default DosageShow;
