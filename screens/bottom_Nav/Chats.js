import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
  Pressable,
} from "react-native";
import { db } from "../../firebaseConfig";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chats({ navigation, route }) {
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAllChats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllChats();
      setRefreshing(false);
    }, 2000);
  };

  const getAllChats = async () => {
    const id = await AsyncStorage.getItem("userDocId");
    const itemsCollection = collection(db, "Chats"); // Replace 'yourCollection' with your collection name
    const querySnapshot = await getDocs(itemsCollection);

    const matchingItems = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.ownerId === id) {
        matchingItems.push({ id: doc.id, ...data });
      }
    });
    console.log(matchingItems);
    setChats(matchingItems);
  };
  const goToMessage = (data) => {
    navigation.navigate("Messages", {
      data,
    });
  };

  const deleteChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "Chats", chatId);
      await deleteDoc(chatDocRef);
      getAllChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const confirmDeleteChat = (chatId) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteChat(chatId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.chats}>
        <Pressable
          style={styles.chatItem}
          onPress={() => {
            goToMessage(item);
          }}
        >
          <Image source={{ uri: item.Image[0] }} style={styles.itemIamge} />
          <View style={styles.textItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.chatText}>{item.chats[0].message}</Text>
          </View>
          <Pressable
            style={styles.deleteButton}
            onPress={() => confirmDeleteChat(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.mainText}>Matches</Text>
          <FlatList
            data={chats}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
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
  itemImage: {
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
  deleteButton: {
    marginLeft: "auto",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
