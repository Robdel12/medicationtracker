import React, { Component, Fragment } from "react";
import { Button, View, StyleSheet } from "react-native";
import { List, ListItem, Text } from "react-native-elements";

import { headerStyle } from "../style";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Med Tracker",
      ...headerStyle,
      headerRight: (
        <Button
          title="Add"
          color="white"
          onPress={() => navigation.navigate("NewDosage")}
        />
      )
    };
  };

  renderDosage(dosage) {
    let hasDosage = dosage.length;

    if (!hasDosage) {
      return null;
    } else {
      return dosage.map((dosage, index) => {
        return (
          <ListItem
            key={index}
            title={dosage.name}
            chevronColor="#FF715B"
            containerStyle={styles.listContainer}
            titleStyle={styles.listTitle}
            subtitleStyle={styles.listSubtitle}
            onPress={() =>
              this.props.navigation.navigate("DosageShow", { dosage })
            }
            subtitle={`${dosage.dosage} ${"\u2022"} ${dosage.displayTakenTime}`}
          />
        );
      });
    }
  }

  render() {
    let { model } = this.props.screenProps;

    if (!model.state.dosages.length) {
      return <Text>Add a dosage</Text>;
    }

    return (
      <View style={{ backgroundColor: "#312F2F", flex: 1 }}>
        {model.state.activeDosages.length && (
          <Fragment>
            <Text style={styles.listHeading}>ACTIVE</Text>
            <List>{this.renderDosage(model.state.activeDosages)}</List>
          </Fragment>
        )}

        {model.state.expiredDosages.length && (
          <Fragment>
            <Text style={styles.listHeading}>EXPIRED</Text>
            <List>{this.renderDosage(model.state.expiredDosages)}</List>
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listHeading: {
    fontSize: 14,
    marginTop: 25,
    marginLeft: 8,
    marginBottom: -15,
    color: "white"
  },
  listContainer: {
    backgroundColor: "white"
  },
  listTitle: {
    fontWeight: "bold",
    color: "black"
  },
  listSubtitle: {
    fontWeight: "normal",
    color: "black"
  }
});

export default HomeScreen;
