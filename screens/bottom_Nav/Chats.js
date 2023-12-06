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
} from "react-native";
import Gurkirat from "../../assets/gurkirat.png";
import Gopal from "../../assets/gopal.png";
import Roni from "../../assets/gurkiSecond.png";
import Mert from "../../assets/secondImage.jpg";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
export default function Chats({ navigation, route }) {
  useEffect(() => {
    getAllChats();
  }, []);
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
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
  const deleteItem = (item) => {
    console.log("==================");
    console.log(item);
    deleteDocument(item.email);
  };
  async function deleteDocument(documentId) {
    try {
      // Create a query to find the document with the specified ID
      const q = query(
        collection(db, "Chats"),
        where("email", "==", documentId)
      );

      // Execute the query and get the documents that match the condition
      const querySnapshot = await getDocs(q);

      // Check if there are any matching documents
      if (querySnapshot.size > 0) {
        // Assuming you want to delete all matching documents, you can loop through them
        querySnapshot.forEach(async (doc) => {
          // Delete each document
          await deleteDoc(doc.ref);
          console.log(`Document with ID ${documentId} deleted successfully.`);
          alert("Deleted successfully");
        });
      } else {
        console.log(`No documents found with ID ${documentId}.`);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }
  const renderItem = ({ item }) => {
    console.log(item.chats[0].message);
    return (
      <GestureRecognizer
        onSwipeLeft={() => {
          deleteItem(item);
        }}
        style={style.swipe}
      >
        <View style={style.chats}>
          <Pressable
            style={style.chatItem}
            onPress={() => {
              goToMessage(item);
            }}
          >
            <Image source={{ uri: item.Image[0] }} style={style.itemIamge} />
            <View style={style.textItem}>
              <Text style={style.name}>{item.name}</Text>
              <Text style={style.chatText}>{item.chats[0].message}</Text>
            </View>
          </Pressable>
        </View>
      </GestureRecognizer>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={style.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={style.container}>
        <View style={style.mainView}>
          <Text style={style.mainText}>Matches</Text>
          <FlatList
            data={chats}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={style.scroll}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  swipe: {
    width: "100%",
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
