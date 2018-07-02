import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/home';
import NewDosageScreen from './screens/new-dosage';

export const RootNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    NewDosage: NewDosageScreen
  },
  {
    // headerMode: 'none'
  }
);
