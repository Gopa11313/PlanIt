import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Gurkirat from "../../assets/gurkirat.png";
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { collection, getDocs, updateDoc, addDoc, deleteDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";



const EditProfile = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllUserData();
  }, []);

  async function getAllUserData() {
    try {
      const usersCollection = collection(db, "Users");
      const querySnapshot = await getDocs(usersCollection);
      const userData = [];
      const userEmail = await AsyncStorage.getItem("email");
      querySnapshot.forEach((doc) => {
        const user = {
          id: doc.id,
          ...doc.data(),
        };
        if (userEmail != doc.data().email) {
          userData.push(user);
        }
      });
      setName(userData[0].name);
      setUsername(userData[0].username);
      // Fetch and set the image URL if available
      setSelectedImage(userData[0].Image[0]);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }

  const updateUserData = async () => {
    try {
      const userDocumentId = "userDocumentId";
      const userDocRef = doc(db, "Users", userDocumentId);
      await updateDoc(userDocRef, {
        name: name,
        username: username,
      });
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleImagePress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
  
      if (!result.cancelled) {
        setSelectedImage(result.uri);
        uploadImage(result.uri);
      }
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };
  
  const uploadImage = async (uri) => {
    try {
      const imageRef = storage.ref().child(`images/${name}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await imageRef.put(blob);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const removeImage = async () => {
    try {
      const imageRef = storage.ref().child(`images/${name}`);
      await imageRef.delete();
      setSelectedImage(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row" }}>
        {selectedImage ? (
          <Image style={style.imageView} source={{ uri: selectedImage }} />
        ) : (
          <Image style={style.imageView} source={Gurkirat} />
        )}
        <Pressable style={style.addImageButton} onPress={handleImagePress}>
          <Text>Add Image</Text>
        </Pressable>
      </View>

      <View style={style.infoInputBox}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable style={style.saveButton} onPress={updateUserData}>
          <Text style={style.buttonText}>Save</Text>
        </Pressable>
      </View>

      {selectedImage && (
        <TouchableOpacity onPress={removeImage}>
          <Text style={{ color: "red", textAlign: "center" }}>Remove Image</Text>
        </TouchableOpacity>
      )}
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
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 15,
    margin: 10,
  },
  addImageButton: {
    width: 150,
    height: 150,
    borderRadius: 15,
    backgroundColor: "#d3d3d3",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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

  infoInputBox: {
    margin: 10,
    padding: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;
