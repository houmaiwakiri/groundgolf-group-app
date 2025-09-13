import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./presentation/screens/HomeScreen";
import ScoreRegisterScreen from "./presentation/screens/ScoreRegisterScreen";
import ScoreListScreen from "./presentation/screens/ScoreListScreen";
import TeamScreen from "./presentation/screens/TeamScreen";
import OtherScreen from "./presentation/screens/Otherscreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="ホーム" component={HomeScreen} />
        <Tab.Screen name="スコア登録" component={ScoreRegisterScreen} />
        <Tab.Screen name="スコア一覧" component={ScoreListScreen} />
        <Tab.Screen name="チーム" component={TeamScreen} />
        <Tab.Screen name="その他" component={OtherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
