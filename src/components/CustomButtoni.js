import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const CustomButtoni = ( { title, icoName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
     
      <Text style={styles.buttonText}>{title} </Text>
      <FontAwesome name={icoName} size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:`#e6e6fa`,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default CustomButtoni;
