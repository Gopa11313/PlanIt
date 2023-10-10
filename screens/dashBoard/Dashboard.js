
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import EventDetails from "../bottom_Nav/EventDatails";
import Home from "../bottom_Nav/Home";
import Explore from "../bottom_Nav/Explore";
import Chats from "../bottom_Nav/Chats";
import Favorite from "../bottom_Nav/Favorite";
import Settings from "../bottom_Nav/Setting";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Chats") {
            iconName = focused ? "chatbubble-sharp" : "chatbubble-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          color = "black";
          size = 24;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}


