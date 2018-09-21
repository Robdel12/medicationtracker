import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { List, ListItem, Text, Button } from "react-native-elements";
import { filter } from "microstates";

import { headerStyle } from "../style";

class DosageShow extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.dosage.state.name,
      ...headerStyle
    };
  };

  removeDosage(currentDosage, model) {
    let filteredModel = filter(model.dosages.state, dosage => {
      return currentDosage.state !== dosage;
    });

    model.dosages.set(filteredModel);
    this.props.navigation.navigate("Home");
  }

  render() {
    let { model } = this.props.screenProps;
    let { dosage } = this.props.navigation.state.params;

    return (
      <View style={styles.showContainer}>
        <View style={styles.showContent}>
          <Text style={styles.showText}>
            {dosage.hasExpired
              ? `Expired ${dosage.timeLeft}`
              : `Expires ${dosage.timeLeft}`}
          </Text>
          <Text style={styles.showText}>{dosage.dosage.state}</Text>
          <Text style={styles.showText}>
            Duration: {dosage.dosageDuration.state} hours
          </Text>
          <Text style={styles.showText}>
            {`Taken at ${dosage.formattedTakenTime} and expires at ${
              dosage.formattedExpireTime
            }`}
          </Text>
          <Text style={styles.showText}>{dosage.formattedTakenFullDate}</Text>
        </View>
        <Button
          title="Remove"
          backgroundColor="#84DCCF"
          style={styles.removeBtn}
          onPress={() => this.removeDosage(dosage, model)}
        />
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
    paddingBottom: 20,
    backgroundColor: "#f7f7f7"
  },
  showText: {
    fontSize: 18,
    marginBottom: 8
  },
  removeBtn: {
    marginTop: -10
  }
});

export default DosageShow;
