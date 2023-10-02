import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Splash from "./screens/Splash";
import Home from "./screens/bottom_Nav/Home";
import SelectionScreen from "./screens/SelectionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

const StackView = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackView.Navigator initialRoute="SelectionScreen">
        {/* <StackView.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        ></StackView.Screen> */}
        <StackView.Screen
          name="SelectionScreen"
          component={SelectionScreen}
          options={{ headerShown: false }}
        ></StackView.Screen>
        <StackView.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></StackView.Screen>
        <StackView.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        ></StackView.Screen>
        {/* <StackView.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></StackView.Screen> */}
      </StackView.Navigator>
    </NavigationContainer>
  );
}
