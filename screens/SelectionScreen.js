import { StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const SelectionScreen = ({ navigation }) => {
  const gotoLogin = () => {
    navigation.navigate("Login");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Planit</Text>
      <Pressable onPress={gotoLogin}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={gotoSignUp}>
        <Text>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
//               button: { display: inline-block;
//                 outline: 0;
//                 border: 0;
//                 background-image: linear-gradient(to right,#e052a0,#f15c41);
//                 cursor: pointer;
//                 border-radius: 2px;
//                 color: #fff;
//                 font-weight: 500;
//                 text-align: center;
//                 text-transform: uppercase;
//                 height: 36px;
//                 line-height: 36px;
//                 padding: 0 10px;
//                 font-size: 14px;

//                 :hover {
//                     background-image: linear-gradient(to right,#3ec7e0,#526bf4);
//                 }

// })
export default SelectionScreen;
