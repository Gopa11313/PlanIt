import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import Calender from "../../assets/calender.png";
import Ticket from "../../assets/ticket.png";
import Dress from "../../assets/dress.png";
import Location from "../../assets/location.png";
export default function HomeProfileDetais({ route }) {
  const { userData } = route.params;
  const data = [
    { id: "1", text: "Age", age: userData.Age },
    { id: "2", text: "Alcohal", age: "No" },
    { id: "3", text: "Smoking", age: "No" },
  ];
  const renderItem = ({ item }) => (
    <View style={style.renderItem}>
      <Text>{item.text}:</Text>
      <Text>{item.age}</Text>
      <View style={style.renderEndView} />
    </View>
  );
  return (
    <SafeAreaView style={style.contianer}>
      <ScrollView style={style.scrollView}>
        <View style={style.insideView}>
          <Image style={style.image} source={{ url: userData.Image[0] }} />
          <View style={style.secondView}>
            <Text style={style.category}>Quote</Text>
            <View style={style.categoryName}>
              <Text style={style.title}>{userData.Quote}</Text>
            </View>
          </View>
          <Image style={style.image} source={{ url: userData.Image[1] }} />

          <View style={style.thirdView}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "black",
              }}
            />
            <View style={style.locationCase}>
              <Image style={style.locationImage} source={Location} />
              <Text style={style.location}>{userData.Address}</Text>
            </View>
          </View>
          <View style={style.thirdView}>
            <Text style={style.description}> {userData.Bio}</Text>
            <Pressable style={style.bookmarkBtn}>
              <Text style={{ color: "white", fontSize: 15 }}>Match</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
  },
  scrollView: {
    width: "100%",
  },
  insideView: {
    padding: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    marginTop: 15,
    height: 350,
    borderRadius: 10,
  },
  secondView: {
    marginTop: 25,
    width: "100%",
    height: 160,
    padding: 15,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  category: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "black",
  },
  //reder ITem
  renderItem: {
    width: 110, // Adjust the width as needed
    marginHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    height: 110,
  },
  renderImage: {
    width: 18,
    height: 18,
    margin: 5,
  },

  renderEndView: {
    height: 35,
    marginStart: 20,
    width: 2,
    backgroundColor: "black",
  },
  thirdView: {
    marginTop: 25,
    width: "100%",
    height: 180,
    padding: 10,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  locationCase: {
    padding: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  locationImage: {
    width: 18,
    height: 24,
    objectFit: "fill",
    marginEnd: 10,
  },
  description: {
    fontSize: 15,
    color: "black",
    margin: 10,
  },
  bookmarkBtn: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
