import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
export default function Dashboard({ navigation, route }) {
  useEffect(() => {
    navigation.navigate("EventDetails");
  }, []);
  return (
    <SafeAreaView>
      <Text>DashBoard</Text>
    </SafeAreaView>
  );
}
