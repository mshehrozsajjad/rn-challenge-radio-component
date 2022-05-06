import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import axios from "axios"


export default function App() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [radios, setRadios] = useState([])
  const getStations = async () => {
    try {
      const resp = await axios.get('https://jobapi.teclead-ventures.de/recruiting/radios');
      console.log(resp.data.radios);
      setRadios(resp.data.radios)

    } catch (err) {
      console.error(err);
    }
  };
  const setNext = () => {
    if (!(currentIndex + 1 >= radios.length)) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }
  const setPrevious = () => {
    if (!(currentIndex - 1 < 0)) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentIndex(radios.length - 1);
    }
  }
  useEffect(() => {
    getStations()
  }, [])
  return (

    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
      <View
        style={styles.header}
      >
        <TouchableOpacity>
          <Ionicons name="chevron-back-outline" size={40} color="#FFF" />

        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
        >
          Stations
        </Text>
        <TouchableOpacity onPress={() => setCurrentIndex(null)}>
          <Ionicons name="ios-power" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.stationList}>
        {radios.map(({ name, frequency, image }, index) => {
          return (
            <TouchableOpacity
              key={name}
              onPress={() => {
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              activeOpacity={0.9}
            >
              <View style={styles.listItemRoot}>
                <View style={styles.listItemMain}>
                  <Text style={styles.listItemName}>{name}</Text>
                  <Text style={styles.listItemFrequency}>{frequency}</Text>

                </View>
                {index === currentIndex && (
                  <View style={styles.listItemSubCategoryMain}>

                    <TouchableOpacity
                      onPress={setPrevious}
                    >
                      <AntDesign name="minuscircleo" size={40} color="#9AA1B0" />
                    </TouchableOpacity>
                    <Avatar
                      size={150}
                      rounded
                      source={{
                        uri: `${image}`
                      }}
                    />

                    <TouchableOpacity
                      onPress={setNext}
                    >
                      <AntDesign name="pluscircleo" size={40} color="#9AA1B0" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={styles.footer}
      >
        {currentIndex !== null ? <View style={styles.footerMain}>
          <Text
            style={styles.footerMainHeading}
          >
            Currently Playing
          </Text>
          <Text
            style={styles.footerMainText}
          >
            {radios[currentIndex].name}
          </Text>
        </View> : null}
      </View>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#2D2D38", flex: 1 
  },
  header:{
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    backgroundColor: "#E3B170",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle:{
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  stationList:{
    padding: 20,
  },
  listItemRoot:{
    paddingVertical: 20,
    borderBottomColor: "#9AA1B0",
    borderBottomWidth: .3
  },
  listItemMain:{ flexDirection: "row", justifyContent: "space-between" },
  listItemName:{ color: "#9AA1B0", fontSize: 25 },
  listItemFrequency:{ color: "#9AA1B0", fontSize: 25 ,fontWeight:"bold"},
  listItemSubCategoryMain:{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 20 },
  footer:{
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    minHeight:90,
    backgroundColor: "#2D2D38",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#9AA1B0",
    borderTopWidth: .3
  },
  footerMain:{ alignItems: "center", justifyContent: "center", flex: 1 },
  footerMainHeading:{
    color: "#E3B170",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footerMainText:{
    color: "#9AA1B0",
    fontSize: 32,
    textTransform: "uppercase",

  }
});
