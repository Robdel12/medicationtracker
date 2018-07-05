import React, { Component, Fragment } from "react";
import { Button, View, StyleSheet } from "react-native";
import { List, ListItem, Text } from "react-native-elements";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Med Tracker",
      headerRight: (
        <Button title="Add" onPress={() => navigation.navigate("NewDosage")} />
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
      <View>
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
    color: "#80878e"
  }
});

export default HomeScreen;
