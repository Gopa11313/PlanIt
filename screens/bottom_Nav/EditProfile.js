import React, { useState, useEffect, useDebugValue } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Gurkirat from "../../assets/gurkirat.png";
import ImagePicker from "react-native-image-picker";
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
  updateDoc,
} from "firebase/firestore";
import { TextInput } from "react-native-paper";

const EditProfile = ({ route }) => {
  const [userDoc, setUserDoc] = useState();
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [name, setNAme] = useState("");
  const [address, setaddress] = useState("");
  const [image3, setImage3] = useState("");
  useEffect(() => {
    const userData = route.params;
    console.log(userData.userData);
    setUserDoc(userData.userData);
    setImage1(userData.userData.Image[0]);
    setImage2(userData.userData.Image[1]);
    setaddress(userData.userData.Address);
    setNAme(userData.userData.name);
  }, []);
  // const userData = route.params;

  // const [images, setImages] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   // Fetch user's images from Firebase Storage and populate the 'images' state.
  //   // Replace 'yourUserId' with the actual user's ID or reference.
  //   // Example: const userImagesRef = storage.ref('images/yourUserId');
  //   const userImagesRef = storage.ref("images/yourUserId");

  //   userImagesRef.listAll().then((result) => {
  //     const imageUrls = result.items.map((item) => item.getDownloadURL());
  //     Promise.all(imageUrls).then((urls) => {
  //       setImages(urls);
  //     });
  //   });
  // }, []);

  // const openImagePicker = () => {
  //   const options = {
  //     title: "Select Image",
  //     storageOptions: {
  //       skipBackup: true,
  //       path: "images",
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //       // User canceled the image picker.
  //     } else if (response.error) {
  //       // Handle error during image selection.
  //     } else {
  //       // Upload the selected image to Firebase Storage.
  //       const imageRef = storage.ref(`images/yourUserId/${response.fileName}`);

  //       imageRef.putFile(response.path).then(() => {
  //         // Image uploaded successfully. Refresh the images list.
  //         // You may also want to update your Firestore database to link this image to the user.
  //         // Add the image URL to the 'images' state for display.
  //         imageRef.getDownloadURL().then((url) => {
  //           setImages([...images, url]);
  //         });
  //       });
  //     }
  //   });
  // };

  // const removeImage = (imageUrl) => {
  //   // Remove the image from Firebase Storage.
  //   const imageRef = storage.refFromURL(imageUrl);
  //   imageRef.delete().then(() => {
  //     // Image deleted successfully. Remove it from the 'images' state.
  //     const updatedImages = images.filter((image) => image !== imageUrl);
  //     setImages(updatedImages);
  //   });
  // };
  const updateUser = async () => {
    try {
      console.log(userDoc.id);
      const userDocRef = doc(db, "Users", userDoc.id);
      console.log("Gopal here");
      console.log(userDocRef);
      // Update the 'chats' array by adding a new element
      const updateData = {
        name: name,
        Address: address,
      };

      // Check if 'image3' is not an empty string before adding it to the update
      if (image3 !== "") {
        updateData.Image = arrayUnion(image3);
      }

      // Update the document
      await updateDoc(userDocRef, updateData);

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const updateBtnClick = () => {
    updateUser();
  };
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: image1 }}
          style={style.imageView}
          onError={(e) =>
            console.log("Error loading image:", e.nativeEvent.error)
          }
        />
        <Pressable style={style.addImageButton}>
          <Image
            source={{ uri: image2 }}
            style={style.imageView}
            onError={(e) =>
              console.log("Error loading image:", e.nativeEvent.error)
            }
          />
          {/* <Ionicons name="add-circle-outline" size={24} color="black" /> */}
        </Pressable>
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
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={style.saveButton}
          onPress={() => {
            updateBtnClick();
          }}
        >
          <Text style={style.buttonText}>Save</Text>
        </Pressable>
      </View>
      {/* {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )} */}
      {/* <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
            <TouchableOpacity onPress={() => removeImage(item)}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      /> */}
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
