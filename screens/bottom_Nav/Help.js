import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Toast } from "react-native-toast-message";
export default function Help({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [explanation, setExplanation] = useState("");
  const showToast = () => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success",
      text2: "Button clicked!",
    });
  };
  const createHelp = async () => {
    const help = {
      name: name,
      email: email,
      problem: problem,
      explanation: explanation,
      // date: new Date().toDateString,
    };

    const insertedDocument = await addDoc(collection(db, "Help"), help);
    console.log(insertedDocument);
    alert("Successfully added.");
    showToast();
    setEmail("");
    setName("");
    setExplanation("");
    setExplanation("");
  };
  return (
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
  },
});
