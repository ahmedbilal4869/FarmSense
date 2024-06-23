import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image source={require('../assets/logout.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 110,
    backgroundColor: '#ffff',
  },
  logo: {
    top: 10,
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  icon: {
    top: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Header;
