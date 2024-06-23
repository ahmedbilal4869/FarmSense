import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { app, database } from "../config/firebase";

const dummyLogs = [
  {
    id: "1",
    date: "2024-05-01",
    event: "Feeding",
    details: "Fed all cows with hay",
  },
  {
    id: "2",
    date: "2024-05-02",
    event: "Health Check",
    details: "Checked all cows for health issues",
  },
  {
    id: "3",
    date: "2024-05-03",
    event: "Cleaning",
    details: "Cleaned the barn",
  },
  // Add more dummy data as needed
];

const collectionReference = collection(database, "DailyLogs");
const DailyLogsScreen = () => {
  const [dailyLogs, setDailyLogs] = useState([]);
  const getData = async () => {
    try {
      const response = await getDocs(collectionReference);
      const logs = response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (logs.length > 0) {
        setDailyLogs(logs);
      }
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{item.Date}</Text>
      <Text>Event: {item.Event}</Text>
      <Text>Details: {item.Details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Logs</Text>
      <FlatList
        data={dailyLogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DailyLogsScreen;
