import * as React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard,Button } from 'react-native';
import Header from '../Components/Header';
import CustomInput from '../Components/Text_Input';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { app, database } from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
const collectionReference = collection(database, "Cows");
const Add_Cow= ({navigation}) => {
    const [tag, setTag] = React.useState("");
    const [name_c, setName] = React.useState("");
    const [birth, setBirth] = React.useState("");
    const [age, setAge] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [breed, setBreed] = React.useState("");
    
    const handleSaveCow = async () => {
      // Check for existing tag number before adding
      const querySnapshot = await getDocs(
        query(collectionReference, where("Tag_No", "==", tag))
      );
  
      if (querySnapshot.empty) {
        // Tag number doesn't exist, proceed with adding the cow
        addDoc(collectionReference, {
          Tag_No: tag,
          Name: name_c,
          DOB: birth,
          Age:age,
          Breed: breed,
          Gender: gender,
          Weight: weight,
        })
          .then(() => {
            console.log("Cow added successfully!");
            navigation.goBack(); // Navigate back after successful save
          })
          .catch((err) => {
            console.error("Error adding cow:", err.message);
          });
      } else {
        // Tag number already exists, display error message
        console.error("Error: Tag number already exists!");
        alert(
          "Tag number already assigned to another cow. Please enter a unique tag number."
        ); // Alert user with a message
      }
    };
  
    return (
        <>
            <Header title="Add Cow"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}> 
            <CustomInput
                label="Tag No."
                value={tag}
                onChangeText={setTag}
                placeholder = "Enter the Tag No."
                icon="tag-outline"
            />
            <CustomInput
                label="Name"
                value={name_c}
                onChangeText={setName}
                placeholder = "Enter the Name"
                icon="cow"
            />
            <CustomInput
                label="D.O.B"
                value={birth}
                onChangeText={setBirth}
                placeholder = "Enter the Date of Birth"
                icon="calendar"
            />
            <CustomInput
                label="Age"
                value={age}
                onChangeText={setAge}
                placeholder = "Enter the Age"
                icon="numeric"
            />
            <CustomInput
                label="Gender"
                value={gender}
                onChangeText={setGender}
                placeholder = "Enter the Gender"
                icon="gender-male-female"
            />
            <CustomInput
                label="Weight"
                value={weight}
                onChangeText={setWeight}
                placeholder = "Enter the Weight"
                icon="scale-bathroom"
            />
            <CustomInput
                label="Breed"
                value={breed}
                onChangeText={setBreed}
                placeholder = "Enter the Breed"
                icon="barn"
            />
            <Button onPress={handleSaveCow} title="Add Cow"></Button>
            </View>
            </TouchableWithoutFeedback>
        </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    input: {
      marginTop: 5,
      height: 60,
      borderColor: 'gray',
      borderWidth: 1,
    //   alignSelf: 'center',

    },
  });

  export default Add_Cow;