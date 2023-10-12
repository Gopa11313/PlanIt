import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Favorite() {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text>Gopal favorite</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
