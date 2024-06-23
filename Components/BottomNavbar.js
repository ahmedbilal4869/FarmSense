import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';

const BottomNavbar = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('DailyLogs')} style={styles.iconContainer}>
        <Image source={require('../assets/dailyLogs.png')} style={styles.icon} />
      </TouchableOpacity>
      
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddCow')} style={styles.addButton}>
          <Image source={require('../assets/add.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Catalog')} style={styles.iconContainer}>
        <Image source={require('../assets/catalog.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#E5E9F7',
    paddingHorizontal: 30,
    position: 'relative',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 29.5,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: '60%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.2, // For iOS
    shadowRadius: 2, // For iOS
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E9F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 80,
    height: 80,
  },
});

export default BottomNavbar;