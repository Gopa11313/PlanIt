import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { Checkbox, Colors } from "react-native-paper";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    sports: false,
    movies: false,
    music: false,
    food: false,
    travel: false,
  });

  const handlePreferenceToggle = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const savePreferences = () => {
    // You can implement logic to save the selected preferences to your backend here.
    console.log("Selected Preferences:", preferences);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Select Your Preferences</Text>
      <View style={style.preferenceItem}>
        <Checkbox
          status={preferences.sports ? "checked" : "unchecked"}
          onPress={() => handlePreferenceToggle("sports")}
        />
        <Text>Sports</Text>
      </View>
      <View style={style.preferenceItem}>
        <Checkbox
          status={preferences.movies ? "checked" : "unchecked"}
          onPress={() => handlePreferenceToggle("movies")}
        />
        <Text>Movies</Text>
      </View>
      <View style={style.preferenceItem}>
        <Checkbox
          status={preferences.music ? "checked" : "unchecked"}
          onPress={() => handlePreferenceToggle("music")}
        />
        <Text>Music</Text>
      </View>
      <View style={style.preferenceItem}>
        <Checkbox
          status={preferences.food ? "checked" : "unchecked"}
          onPress={() => handlePreferenceToggle("food")}
        />
        <Text>Food</Text>
      </View>
      <View style={style.preferenceItem}>
        <Checkbox
          status={preferences.travel ? "checked" : "unchecked"}
          onPress={() => handlePreferenceToggle("travel")}
        />
        <Text>Travel</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable style={style.saveButton}>
          <Text style={style.buttonText}>Save Preferences</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    paddingStart: 15,
    paddingEnd: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  saveButton: {
    width: 200,
    height: 40,
    marginTop: 15,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Preferences;
