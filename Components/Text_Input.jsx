import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const CustomInput = ({ label, value, onChangeText, placeholder, icon}) => {
    return (
        <TextInput
            mode = "outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            theme={{
              colors: {
                text: '#000000', // Text color
                primary: '#002366', // Color of the label when focused
                background: '#f5f5f5', // Background color of the text input
                placeholder: '#808080', // Placeholder text color
              },
            }}
            style={styles.input}
            right={icon ? <TextInput.Icon icon={icon} /> : null}
        />
      );
    };

const styles = StyleSheet.create({
    input: {
        marginBottom: 5,
    },
});

export default CustomInput;