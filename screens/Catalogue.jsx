import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../Components/Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomCheckbox from "../Components/Check_Box"; // Import the CustomCheckbox
import { firebaseConfig } from "../config/firebase";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { app, database } from "../config/firebase";

const data = [
  { id: "CP05", status: "A", statusColor: "green" },
  { id: "CP06", status: "S", statusColor: "gray" },
  { id: "CP07", status: "D", statusColor: "red" },
];

const Catalogue = ({ navigation }) => {
  const collectionReference = collection(database, "Cows");
  const [myCow, setMyCow] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    if (!showCheckboxes) {
      setSelectedItems({});
    }
  };
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

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deleteSelectedItems = () => {
    const itemsToDelete = Object.keys(selectedItems).filter(
      (id) => selectedItems[id]
    );
    if (itemsToDelete.length > 0) {
      Alert.alert(
        "Delete Items",
        `Are you sure you want to delete ${itemsToDelete.length} item(s)?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => {
              // Perform the deletion logic here
              console.log("Deleted items:", itemsToDelete);
              // For now, we just reset the state
              setShowCheckboxes(false);
              setSelectedItems({});
            },
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert("No items selected", "Please select items to delete.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {showCheckboxes && (
        <View style={styles.checkboxCell}>
          <CustomCheckbox
            value={selectedItems[item.Tag_No] || false}
            onValueChange={() => handleCheckboxChange(item.id)}
          />
        </View>
      )}
      <View style={styles.cell}>
        <Text style={styles.text}>{item.Tag_No}</Text>
      </View>
      <View style={styles.cell}>
        <View
          style={[styles.statusCircle, { backgroundColor: item.statusColor }]}
        >
          <Text style={styles.statusText}>{data[0].status}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            navigation.navigate("ViewDetails", { Cow: item });
          }}
        >
          <MaterialIcons name="description" size={15} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const hasSelectedItems = Object.values(selectedItems).some(
    (isSelected) => isSelected
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        title="Catalogue"
        showDelete={true}
        showFilter={true}
        showSearch={true}
        onDeletePress={toggleCheckboxes} // Pass the toggle function as a prop
      />
      <View style={styles.tableContainer}>
        <View style={styles.header}>
          {showCheckboxes && <View style={styles.checkboxHeader} />}
          <Text style={[styles.headerText, styles.cell]}>ID</Text>
          <Text style={[styles.headerText, styles.cell]}>STATUS</Text>
          <Text style={[styles.headerText, styles.cell]}>DETAILS</Text>
        </View>
        <FlatList
          data={myCow}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() =>
            showCheckboxes && (
              <TouchableOpacity
                style={[
                  styles.deleteAllButton,
                  !hasSelectedItems && styles.disabledButton,
                ]}
                onPress={deleteSelectedItems}
                disabled={!hasSelectedItems}
              >
                <Text style={styles.deleteAllButtonText}>Delete All</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#74b3ce",
    height: 40,
    justifyContent: "center",
    paddingTop: 10,
    // alignItems: 'center',
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  statusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsButton: {
    padding: 10,
    backgroundColor: "#d0e6fd",
    borderRadius: 5,
    width: 60,
    alignItems: "center",
  },
  checkboxCell: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxHeader: {
    width: 24,
  },
  deleteAllButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  deleteAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Catalogue;
