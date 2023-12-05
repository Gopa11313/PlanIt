import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { Checkbox, Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const Preferences = ({ route }) => {
  const [userDoc, setUserDoc] = useState();
  const [preferences, setPreferences] = useState({
    sports: false,
    movies: false,
    music: false,
    food: false,
    travel: false,
  });
  useEffect(() => {
    const userData = route.params;
    setUserDoc(userData.userData);
    console.log(userData.userData);
    setPreferences({
      sports: userData.userData.preference.sports,
      movies: userData.userData.preference.movies,
      music: userData.userData.preference.music,
      food: userData.userData.preference.food,
      travel: userData.userData.preference.travel,
    });
  }, []);

  const handlePreferenceToggle = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const savePreferences = () => {
    // You can implement logic to save the selected preferences to your backend here.
    console.log("Selected Preferences:", preferences);
    updateUser();
  };
  const updateUser = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("email");

      if (userEmail) {
        const q = query(
          collection(db, "Users"),
          where("email", "==", userEmail)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        if (querySnapshot.size > 0) {
          // Assuming you want the first document in the result set
          const firstDocumentSnapshot = querySnapshot.docs[0];

          // Get the DocumentReference from the snapshot
          const documentRef = firstDocumentSnapshot.ref;
          const updateData = {
            preference: preferences,
          };

          // Now you can use documentRef to perform operations on that specific document
          console.log("DocumentReference:", updateData);

          // Example: Update the document
          await updateDoc(documentRef, updateData);
        } else {
          console.log(`No user found with email ${userEmail}.`);
        }
        // const querySnapshot = await getDocs(q);

        // if (querySnapshot.size > 0) {
        //   const data = querySnapshot.docs[0];
        //   console.log("User document:", data.data());

        //   // Access the 'Id' field correctly
        //   const userDocRef = doc(db, "Users", data.data().id);

        // const updateData = {
        //   name: name,
        //   Address: address,
        // };

        // if (image3 !== "") {
        //   updateData.Image = arrayUnion(image3);
        // }

        // await updateDoc(querySnapshot, updateData);

        // console.log("Document successfully updated!");
      } else {
        console.log("Email is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
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
        <Pressable onPress={savePreferences} style={style.saveButton}>
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
