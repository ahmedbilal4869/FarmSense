import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const CowDetailsScreen = ({ route }) => {
  const { Cow } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Tag No:</Text>
        <Text style={styles.value}>{Cow.Tag_No}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{Cow.Name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>D.O.B:</Text>
        <Text style={styles.value}>{Cow.DOB}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Breed:</Text>
        <Text style={styles.value}>{Cow.Breed}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{Cow.Gender}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{Cow.Weight} kg</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default CowDetailsScreen;
