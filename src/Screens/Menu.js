import {
    StyleSheet, Text, View,
    ScrollView,
    FlatList,
    SafeAreaView,
    Button, Touchable,
    TouchableOpacity
} from 'react-native'
import React, { useState, useEffect,createContext } from 'react'
import { db, auth } from "../firebase/firebase";
import {
    doc, setDoc,
    updateDoc, collection,
    addDoc, getDoc, getDocs,
    query, where, onSnapshot
} from "firebase/firestore";

import { useRoute, useNavigation } from '@react-navigation/native';
import Color from '../Styles/colors';
import  { fetchVeriData } from './MainTab';





const Menus = ({ }) => {
        const [kahvaltiData, setkahvaltiData] = useState([])
    const [araOgun1Data, setaraOgun1Data] = useState([])
    const [ogleData, setogleData] = useState([])
    const [araOgun2Data, setaraOgun2Data] = useState([])
    const [aksamData, setaksamData] = useState([])
    const [Veri, setVeri] = useState("")

    const [FetchData, setFetchData] = useState([0, 1, 2]);
    const [data, setdata] = useState({})
    //const [data, setdata] = useState({})
    const [Lock, setLock] = useState(true)
    const route = useRoute();
    const Params = route.params?.data || {};
    console.log("Params: ", Params["Cal"]);
    const navigation = useNavigation();
    const userMail = auth.currentUser?.email;


    const fetchingData = async () => {
        const veri = await fetchVeriData();
        console.log(veri);
        console.log("calisti");
        // Gelen veriyi kullanabilirsiniz
      };
      



    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemTxt}>{item}</Text>
            </View>
        )
    }
  

    const onTamamlandi = async () => {
        
        try {
            const docRef = doc(db, "User", userMail); // Farklı koleksiyon ve belge kimliği   const docRef = doc(db, "kullanıcıkalori", "kullanıcıcal");  
          await setDoc(docRef, {
            Veri: Veri
          },{merge:true});
          console.log("Veri Firebase'e gönderildi.");
        } catch (error) {
          console.error("Firebase yazma hatası:", error);
        }
        navigation.navigate("Home", { veri: Veri });
        
      
        
      };
       
      
      



    const fetchData = async () => {
        try {
            const docRef = doc(db, "Menu", Params["Cal"]);
            const unsub = onSnapshot(docRef, (doc) => {
                const data_ = doc.data();
                //console.log(data_);
                if (data_) {
                    setdata(data_);
                    setkahvaltiData(data["Kahvaltı"]);
                    setaraOgun1Data(data["Ara Öğün 1"]);
                    setogleData(data["Öğle"]);
                    setaraOgun2Data(data["Ara Öğün 2"]);
                    setaksamData(data["Akşam"]);
                    setLock(true);
                }




            });
            return unsub;
        } catch (error) {
            console.log(error);

        }
    };



    useEffect(() => {
        setVeri(Params["Cal"])
        const unsubscribe = fetchData();
        return () => unsubscribe;
    }, []);

    return (
        <ScrollView style={styles.Maincont}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={styles.cont}>
                <Text style={{
                color: "white",
                    textAlign: "center",
                    fontSize: 40,

                }}>Kalori:{Veri}</Text>
            </TouchableOpacity>
            <View style={styles.cont}>
                <Text style={styles.Header}> Kahvaltı</Text>
            </View>
            <View style={styles.cont}>
                <FlatList
                    renderItem={renderItem}
                    data={data["Kahvaltı"]}
                    keyExtractor={(item) => item}
                />
            </View>

            <View style={styles.cont}>
                <Text style={styles.Header}> Ara -1 </Text>
            </View>
            <View style={styles.cont}>
                <FlatList
                    renderItem={renderItem}
                    data={data["Ara Öğün 2"]}
                    keyExtractor={(item) => item}
                />
            </View>
            <View style={styles.cont}>
                <Text style={styles.Header}> Öğle </Text>
            </View>
            <View style={styles.cont}>
                <FlatList
                    renderItem={renderItem}
                    data={data["Öğle"]}
                    keyExtractor={(item) => item}
                />
            </View>
            <View style={styles.cont}>
                <Text style={styles.Header}> Ara -2 </Text>
            </View>
            <View style={styles.cont}>
                <FlatList
                    renderItem={renderItem}
                    data={data["Ara Öğün 2"]}
                    keyExtractor={(item) => item}
                />
            </View>
            <View style={styles.cont}>
                <Text style={styles.Header}> Akşam </Text>
            </View>
            <View style={styles.cont}>
                <FlatList
                    renderItem={renderItem}
                    data={data["Akşam"]}
                    keyExtractor={(item) => item}
                />
            </View>
            <Button title="Tamamladım" onPress={onTamamlandi} style ={styles.buttonWrapper} />




        </ScrollView>
    )
}



const styles = StyleSheet.create({
    Maincont: {
        flex: 1,
        backgroundColor: "lightgrey"

    },
    cont: {
        flex: 1,
        backgroundColor: Color.main,
        margin: 6,
        borderRadius: 10,
        padding: 3,
        borderWidth: 2,
        borderColor:"skyblue",
    },
    Header: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 2,
        padding: 10,
        color: 'white'
    },
    item: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 6,
        flex: 1
    },
    itemTxt: {
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left",
        letterSpacing: 0.2,

    },
    buttonWrapper:{
        flex:1,
        fontSize:32,
        backgroundColor:'white',

    },


})

export default Menus;
