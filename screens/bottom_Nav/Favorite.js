import React, { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Swipeable,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Import your Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Favorite({ navigation, route }) {
  const [favoriteData, setFavoriteData] = useState([]);
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={style.pressable}
        onPress={() => {
          handleOnClick(item);
        }}
      >
        <View style={style.renderItem}>
          <View style={style.firstView}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Name: {item.name}
            </Text>
            <Text style={{ marginTop: 5 }}>Address: {item.address}</Text>
            <Text style={{ marginTop: 2, fontSize: 13 }}>
              Description: {item.description}
            </Text>
          </View>
          <View style={style.secondView}>
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 10 }}
              source={{ uri: item.image }}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  const handleOnClick = (selectedMarker) => {
    navigation.navigate("EventDetails", { selectedMarker, fromExplore: false });
  };
  useEffect(() => {
    getAllFavorite();
  }, []);
  const handleDeleteItem = (item) => {
    console.log("Delete");
  };
  const getAllFavorite = async () => {
    const userDocId = await AsyncStorage.getItem("userDocId");
    const favoritesCollection = collection(db, "Favorite"); // Update to your collection name

    const q = query(favoritesCollection, where("userDocId", "==", userDocId));

    try {
      const querySnapshot = await getDocs(q);
      const favorites = [];

      querySnapshot.forEach((doc) => {
        favorites.push({ id: doc.id, ...doc.data() });
      });
      setFavoriteData(favorites);
      console.log(favorites);
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      return [];
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.header}>Favorites</Text>
        <FlatList
          data={favoriteData}
          renderItem={renderItem}
          keyExtractor={(image, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
  },
  header: {
    fontWeight: "500",
    fontSize: 23,
  },
  renderItem: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 200,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  pressable: {
    width: "100%",
  },
  firstView: {
    width: "60%",
    height: "100%",
  },
  secondView: {
    width: "40%",
    height: "100%",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
});
