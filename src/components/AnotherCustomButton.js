import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AnotherCustomButton = ( { title, icoName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
     
      <Text style={styles.buttonText}>{title} </Text>
      <FontAwesome name={icoName} size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:`transparent`,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft:0.2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default AnotherCustomButton;
