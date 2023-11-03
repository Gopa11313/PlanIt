import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import Gurkirat from "../../assets/gurkirat.png";
import Gopal from "../../assets/gopal.png";
import Roni from "../../assets/gurkiSecond.png";
import Mert from "../../assets/secondImage.jpg";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Chats() {
  const chatData = [
    {
      id: "1",
      name: "Gopal",
      image: Gopal,
      chatText: "No i just live there, I am at work.",
    },
    {
      id: "2",
      name: "Gurkirat",
      image: Gurkirat,
      chatText: "What do you think? Should we go to that event?",
    },
    {
      id: "3",
      name: "Roni",
      image: Roni,
      chatText: "Just got off from the work. See you later.",
    },
    {
      id: "4",
      name: "Mert",
      image: Mert,
      chatText: "Ok, I will be there at 8. See ya.",
    },
    {
      id: "5",
      name: "Gurkirat",
      image: Gurkirat,
      chatText: "What do you think? Should we go to that event?",
    },
    {
      id: "6",
      name: "Mert",
      image: Mert,
      chatText: "Ok, I will be there at 8. See ya.",
    },
    {
      id: "8",
      name: "Gopal",
      image: Gopal,
      chatText: "No i just live there, I am at work.",
    },
    {
      id: "9",
      name: "Roni",
      image: Roni,
      chatText: "Just got off from the work. See you later.",
    },
    {
      id: "10",
      name: "Gopal",
      image: Gopal,
      chatText: "No i just live there, iam at work.",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={style.chats}>
        <View style={style.chatItem}>
          <Image source={item.image} style={style.itemIamge} />
          <View style={style.textItem}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.chatText}>{item.chatText}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainView}>
        <Text style={style.mainText}>Matches</Text>
        <FlatList
          data={chatData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
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
    backgroundColor: "#fff",
  },
  mainView: {
    height: "100%",
    padding: 10,
    width: "100%",
  },
  mainText: {
    fontSize: 21,
    fontWeight: "500",
  },
  chats: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },

  chatItem: {
    width: "100%",
    height: 80,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  itemIamge: {
    height: "100%",
    width: 60,
    borderRadius: 130,
  },
  textItem: {
    marginStart: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  chatText: {
    fontSize: 13,
  },
});
