import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";

const Splash = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate("SelectionScreen");
  }, 4000);
  return (
    <SafeAreaView>
      <Text>PlanIt</Text>
      <Text>Make friend, planit and explore together!</Text>
    </SafeAreaView>
  );
};
