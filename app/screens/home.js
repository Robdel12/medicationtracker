import React, { Component, Fragment } from "react";
import { Button as RNButton, ScrollView, View, StyleSheet } from "react-native";
import { List, ListItem, Text, Button } from "react-native-elements";

import { headerStyle } from "../style";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Med Tracker",
      ...headerStyle,
      headerBackTitle: "Home",
      headerRight: (
        <Button
          title={null}
          icon={{
            name: "add",
            size: 25
          }}
          backgroundColor="transparent"
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
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No Dosages</Text>
          <Text style={styles.emptyStateText}>Please add a dosage</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#312F2F",
    flex: 1
  },
  emptyStateContainer: {
    backgroundColor: "#312F2F",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyStateTitle: {
    color: "white",
    fontSize: 40,
    marginBottom: 15
  },
  emptyStateText: {
    color: "white",
    fontSize: 20
  },
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
