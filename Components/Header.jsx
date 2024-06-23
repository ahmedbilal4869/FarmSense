import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title, showDelete, showFilter, showSearch, onDeletePress }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => {}} color="black" size={25} marginBottom={-10} />
      <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
      {showDelete && (
        <Appbar.Action icon="delete" onPress={onDeletePress} color="black" size={25} marginBottom={-15} />
      )}
      {showFilter && (
        <Appbar.Action icon="filter" onPress={() => {}} color="black" size={25} marginBottom={-15} />
      )}
      {showSearch && (
        <Appbar.Action icon="magnify" onPress={() => {}} color="black" size={25} marginBottom={-15} />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D2E3F2', // Your custom background color
    elevation: 4, // Your custom shadow
  },
  title: {
    marginBottom: -10,
    fontSize: 25, // Adjust title font size (optional)
    color: 'black', // Adjust title color (optional)
  },
});

export default Header;