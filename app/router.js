import { createStackNavigator } from "react-navigation";

import HomeScreen from "./screens/home";
import NewDosageScreen from "./screens/new-dosage";
import DosageShowScreen from "./screens/dosage-show";

export const RootNavigator = createStackNavigator({
  Home: HomeScreen,
  NewDosage: NewDosageScreen,
  DosageShow: DosageShowScreen
});
