import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { firebaseConfig } from "../config/firebase";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { app, database } from "../config/firebase";

const CatalogScreen = () => {
  const collectionReference = collection(database, "Cows");
  const [myCow, setMyCow] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const getData = async (filter = "") => {
    try {
      let q = collectionReference;

      if (filter === "weight") {
        q = query(
          collectionReference,
          where("Weight", ">=", parseInt(minWeight))
        );
      } else if (filter === "breed") {
        q = query(collectionReference, where("Breed", "==", breedFilter));
      } else if (filter === "name") {
        q = query(collectionReference, where("Name", "==", nameFilter));
      }

      const response = await getDocs(q);
      const cows = response.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setMyCow(cows);
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  };

  useEffect(() => {
    getData(selectedFilter);
  }, [selectedFilter]);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const applyFilter = () => {
    getData(selectedFilter);
    setFilterModalVisible(false);
  };

  const clearFilter = () => {
    setSelectedFilter("");
    setMinWeight("");
    setBreedFilter("");
    setNameFilter("");
    getData();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.Name}</Text>
      <Text>Breed: {item.Breed}</Text>
      <Text>Weight: {item.Weight}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalog</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={openFilterModal}>
          <Text style={styles.filterIcon}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={myCow}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setSelectedFilter("weight")}>
              <Text style={styles.modalText}>Filter by Weight</Text>
            </TouchableOpacity>
            {selectedFilter === "weight" && (
              <TextInput
                style={styles.input}
                placeholder="Minimum Weight"
                value={minWeight}
                onChangeText={setMinWeight}
                keyboardType="numeric"
              />
            )}
            <TouchableOpacity onPress={() => setSelectedFilter("breed")}>
              <Text style={styles.modalText}>Filter by Breed</Text>
            </TouchableOpacity>
            {selectedFilter === "breed" && (
              <TextInput
                style={styles.input}
                placeholder="Breed"
                value={breedFilter}
                onChangeText={setBreedFilter}
              />
            )}
            <TouchableOpacity onPress={() => setSelectedFilter("name")}>
              <Text style={styles.modalText}>Filter by Name</Text>
            </TouchableOpacity>
            {selectedFilter === "name" && (
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={nameFilter}
                onChangeText={setNameFilter}
              />
            )}
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.modalText}>Show All Cows</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={applyFilter}>
              <Text style={styles.modalText}>Apply Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  filterIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default CatalogScreen;
