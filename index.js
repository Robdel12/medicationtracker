import { AppRegistry } from "react-native";
import App from "./app/index.js";
import { YellowBox } from "react-native";

// LOL
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Module iCloudStorage requires main queue"
]);

AppRegistry.registerComponent("MedicationTracker", () => App);
