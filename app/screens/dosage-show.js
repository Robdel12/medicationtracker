import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { List, ListItem, Text, Button } from "react-native-elements";

import { headerStyle } from "../style";

class DosageShow extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.dosage.name,
      ...headerStyle
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
        <View style={styles.showContent}>
          <Text style={styles.showText}>{dosage.dosage}</Text>
          <Text style={styles.showText}>Duration: {dosage.dosageDuration}</Text>
          <Text style={styles.showText}>
            {dosage.hasExpired
              ? `Expired ${dosage.timeLeft}`
              : `Expires ${dosage.timeLeft}`}
          </Text>
          <Text style={styles.showText}>
            Time Taken: {dosage.displayTakenTime}
          </Text>
          <Text style={styles.showText}>Time Up: {dosage.timeUpDisplay}</Text>

          <Button
            title="Remove"
            backgroundColor="#84DCCF"
            style={styles.removeBtn}
            onPress={() => this.removeDosage(dosage, model)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showContainer: {
    flex: 1,
    backgroundColor: "#312F2F"
  },
  showContent: {
    padding: 20,
    paddingBottom: 35,
    backgroundColor: "#f7f7f7"
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
