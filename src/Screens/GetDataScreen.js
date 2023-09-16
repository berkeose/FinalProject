import {
  StyleSheet, Button,
  Text, View, ScrollView
} from 'react-native'
import React, { useMemo, useState } from 'react'
import Color from '../Styles/colors'
import GetDataInput from '../components/GetDataInput'
import RadioGroup from 'react-native-radio-buttons-group';
import SubmitBtn from '../components/SubmitBtn';

import { db, auth } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";

import { useNavigation } from "@react-navigation/core"

// Add a new document in collection "cities"

const GetDataScreen = () => {
  const radioButtons = useMemo(() => ([
    {
      id: 'K', // acts as primary key, should be unique and non-empty string
      label: 'Kadın',
      value: 'K'
    },
    {
      id: 'E', // acts as primary key, should be unique and non-empty string
      label: 'Erkek',
      value: 'E'
    },

  ]), []);
  const [Cinsiyet, setCinsiyet] = useState("K");
  const [Name, setName] = useState("")
  const [Soyisim, setSoyisim] = useState("")
  const [Boy, setBoy] = useState("")
  const [Kilo, setKilo] = useState("")
  const [Yas, setYas] = useState("")
  const [Adim, setAdim] = useState("")
  const userMail = auth.currentUser?.email;

  const navigation = useNavigation()
  const Kcal = () => {
    let x = 0;
    if (Cinsiyet == 'K') {
      x = 655.1 + (9.56 * Kilo) + (1.85 * Boy) - (4.67 * Yas)

    }
    if (Cinsiyet == 'E') {
      x = 66.5 + (13.75 * Kilo) + (5 * Boy) - (6.77 * Yas)

    } return (x);
  }
  const HandlePress = async () => {
    calc = Kcal()
    //console.log('Calculating: ', calc)
  const Step =()=>{
    let y=0;
    if(Adim>0){
      y= Adim*0.05
    }
  }
    await setDoc(doc(db, "User", userMail), {
      
      Ad: Name,
      Soyad: Soyisim,
      Height: Boy,
      Weight: Kilo,
      Age: Yas,
      Cinsiyet: Cinsiyet,
      Kcal: parseInt(calc).toString(),
      Step:Adim,

    });
    navigation.navigate("Home")


  }

  return (
    <ScrollView>
    <View style={styles.Cont} >
      <View style={styles.HeaderCont} >
        <Text style={styles.HeaderTxt}>Hadi bize biraz anlat!</Text>
      </View>
      <View style={styles.ContentCont} >
        <GetDataInput
          Name={"İsim"} onChangeText={(x) => setName(x)  }
        />
        <GetDataInput
          Name={"Soyisim"} onChangeText={(x) => setSoyisim(x)}
        />
        <GetDataInput
          Name={"Boy"} onChangeText={(x) => setBoy(x)}
        />
        <GetDataInput
          Name={"Kilo"} onChangeText={(x) => setKilo(x)}
        />
        <GetDataInput
          Name={"Yaş"} onChangeText={(x) => setYas(x)}
        />
        <GetDataInput
          Name={"Adım Sayısı"} onChangeText={(x) => setAdim(x)}
        />
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setCinsiyet}
          selectedId={Cinsiyet}
          layout='row'
        />





        <SubmitBtn
          title="Başla!" onPress={HandlePress}
        />
      </View>


    </View>
    </ScrollView>
  )
}

export default GetDataScreen

const styles = StyleSheet.create({
  Cont: {
    backgroundColor: "lightGray",
    flex: 1
  },
  HeaderCont: {
    borderBottomWidth: 1,
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",

  },
  ContentCont: {
    flex: 8,

  },

  HeaderTxt: {
    textAlign: "center",
    fontSize: 27,
    letterSpacing: .3,
    color: "grey",





  }


})