import { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/onboarding/SpalshScreen";
import WelcomePageScreen from "./screens/onboarding/welcomepages/WelcomePageScreen";
import LoginScreen from "./screens/onboarding/login/LoginScreen";
import SignUpScreen from "./screens/onboarding/SignUp/SignUpScreen";
import Dashboard from "./screens/dashBoard/Dashboard";
import EventDetails from "./screens/bottom_Nav/EventDatails";
import HomeProfileDetais from "./screens/bottom_Nav/HomeProfileDeatails";
import Help from "./screens/bottom_Nav/Help";

import Preferences from "./screens/bottom_Nav/Preferences";
import EditProfile from "./screens/bottom_Nav/EditProfile";
import Messages from "./screens/bottom_Nav/Messages";
import messaging from "@react-native-firebase/messaging";
import {
  requestUserPermission,
  getToken,
  notificationListenr,
} from "./utils/MessageUtlis";
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    requestUserPermission();
    notificationListenr();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePageScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
        ></Stack.Screen>
        <Stack.Screen
          name="HomeProfileDetais"
          component={HomeProfileDetais}
        ></Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>

        <Stack.Screen name="Preferences" component={Preferences}></Stack.Screen>
        <Stack.Screen name="Help" component={Help}></Stack.Screen>
        <Stack.Screen name="Messages" component={Messages}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// gopal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
