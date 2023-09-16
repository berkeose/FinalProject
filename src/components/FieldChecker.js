import {
  StyleSheet,
  TextInput,
  Text, View, TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Color from '../Styles/colors';


const FieldChecker = ({ title, onPress }) => {

  const [NewTxt, setNewTxt] = useState(title)

  return (
    <View style={styles.cont}>

      <TextInput
        style={styles.InputCont}
        onChangeText={(d) => setNewTxt(d)}
        placeholder={title}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity onPress={() => {
        onPress(NewTxt)
      }} style={{ flex: .1 }} >
        <Ionicons name="checkmark-circle" size={29} color={Color.accent1} />
      </TouchableOpacity>


    </View>
  )
}

export default FieldChecker

const styles = StyleSheet.create({

  cont: {

    flex: .15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  },

  InputCont: {
    borderBottomWidth: .7,
    borderColor: "grey",
    flex: .8,
    padding: 2,
    fontSize: 17,
    color: Color.txt



  },

})