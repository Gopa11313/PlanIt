import React, { useState, useEffect, useDebugValue } from "react";
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
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EditProfile = ({ route }) => {
  const [userDoc, setUserDoc] = useState(null);
  const [images, setImages] = useState([]);
  const [image2, setImage2] = useState("");
  const [name, setNAme] = useState("");
  const [address, setaddress] = useState("");
  const [image3, setImage3] = useState("");
  useEffect(() => {
    const userData = route.params;
    console.log(userData.userData);
    setUserDoc(userData.userData);
    setImages(userData.userData.Image);
    setImage2(userData.userData.Image[1]);
    setaddress(userData.userData.Address);
    setNAme(userData.userData.name);
  }, []);

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
            name: name,
            Address: address,
          };

          if (image3 !== "") {
            updateData.Image = arrayUnion(image3);
          }
          // Now you can use documentRef to perform operations on that specific document
          console.log("DocumentReference:", updateData);

          // Example: Update the document
          await updateDoc(documentRef, updateData);
          alert("Updated successfully");
        } else {
          console.log(`No user found with email ${userEmail}.`);
        }
      } else {
        console.log("Email is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const updateBtnClick = async () => {
    console.log("Gopal here");
    updateUser();
  };
  const renderItem = ({ item }) => (
    <Pressable style={style.imageContainer}>
      <Image
        source={{ uri: item }}
        style={style.imageView}
        onError={(e) =>
          console.log("Error loading image:", e.nativeEvent.error)
        }
      />
    </Pressable>
  );
  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={images}
          style={style.flatlist}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
        />
        {/* <Image
          source={{ uri: image1 }}
          style={style.imageView}
          onError={(e) =>
            console.log("Error loading image:", e.nativeEvent.error)
          }
        />

        <Image
          source={{ uri: image2 }}
          style={style.imageView}
          onError={(e) =>
            console.log("Error loading image:", e.nativeEvent.error)
          }
        /> */}
      </View>

      <View style={style.infoInputBox}>
        <TextInput placeholder="Name" value={name} onChangeText={setNAme} />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setaddress}
        />
        <TextInput
          placeholder="Add image"
          value={image3}
          onChangeText={setImage3}
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
        <Pressable style={style.saveButton} onPress={updateBtnClick}>
          <Text style={style.buttonText}>Save</Text>
        </Pressable>
      </View>
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
  imageContainer: {
    width: "50%",
  },
  flatlist: {
    width: "100%",
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
