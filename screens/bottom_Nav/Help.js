import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getStorage,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "react-native-toast-message";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function Help({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [explanation, setExplanation] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const createHelp = async () => {
    try {
      if (name != "" && email != "" && problem != "") {
        const help = {
          Id: uuidv4(),
          name: name,
          email: email,
          problem: problem,
          explanation: explanation,
          screentShot: selectedImage,
        };
        const insertedDocument = await addDoc(collection(db, "Help"), help);
        console.log("Document inserted successfully:", insertedDocument);
        alert("Successfully added.");

        setEmail("");
        setName("");
        setExplanation("");
      } else {
        Alert("Please provide all the information");
      }
    } catch (error) {
      console.error("Error uploading help:", error);
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
      console.log("Image Picker Result:", result);
      if (!result.canceled && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setSelectedImage(selectedImageUri);
        uploadImage(selectedImageUri);
      }
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const mountainImagesRef = ref(storage, `images/${name}123.jpg`);
      // const imageRef = storage.ref().child(`images/${name}`);
      // const imageRef = storage.ref().child(`images/${name}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      uploadBytes(mountainImagesRef, blob).then((snapshot) => {
        console.log(snapshot.metadata);

        console.log("Uploaded a blob or file!");
      });
      console.log("Gopal here");
      const downloadURL = await getDownloadURL(mountainImagesRef);
      setSelectedImage(downloadURL);
      // console.log(downloadURL);
      // await mountainImagesRef.put(blob);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    console.log("Selected Image:", selectedImage);
  }, [selectedImage]);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <Text style={styles.label}>Problem</Text>
          <TextInput
            style={styles.input}
            value={problem}
            onChangeText={setProblem}
            placeholder="Briefly describe the problem"
          />

          <Text style={styles.label}>Explanation</Text>
          <TextInput
            style={styles.input}
            value={explanation}
            onChangeText={setExplanation}
            placeholder="Explain in detail"
            multiline
            numberOfLines={4}
          />
          <Text style={styles.label}>Screenshot</Text>
          <Pressable onPress={handleImagePress} style={styles.addImageButton}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imageView}
              onError={(e) =>
                console.log("Error loading image:", e.nativeEvent.error)
              }
            />
          </Pressable>
          <Pressable onPress={createHelp} style={styles.button}>
            <Text
              style={{
                color: "white",
              }}
            >
              Submit
            </Text>
          </Pressable>
          {/* <Button style={styles.button} title="Submit" /> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
  },
  form: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderRadius: 10,
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
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 15,
    margin: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 50,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "black",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});
