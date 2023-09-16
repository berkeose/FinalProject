import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../Styles/colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core"
import { db, auth } from "../firebase/firebase"
import FieldChecker from '../components/FieldChecker';



import {
    doc, onSnapshot, updateDoc, getDoc
} from "firebase/firestore";
import SubmitBtn from '../components/SubmitBtn';


const Settings = () => {
    const navigation = useNavigation()
    const LogOut = () => {
        navigation.navigate("Login")
    }

    const userMail = auth.currentUser?.email;
    const [data, setdata] = useState("await...")


    const fetchData = async () => {
        try {
            const docRef = doc(db, "User", userMail);
            const unsub = onSnapshot(docRef, (doc) => {
                const data = doc.data();
                console.log(data);
                setdata(data);
            });
            return unsub;
        }
        catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        const unsubscribe = fetchData();
        return () => unsubscribe;
    }, []);
    /*
    x = kilo
    y =boy
    z = yas
    c = cinsiyet
    */
    const Kcal = (x, y, z, c) => {
        let k = 0;
        if (c == "K") {
            k = 655.1 + (9.56 * x) + (1.85 * y) - (4.67 * z)

        }
        if (c == "E") {
            k = 66.5 + (13.75 * x) + (5 * y) - (6.77 * z)

        } return(k);
    }

    const UpdateField = async (n, data_) => {

        const DocRef = doc(db, "User", userMail);
        await updateDoc(DocRef, {
            [n]: data_
        });
        const docSnap = await getDoc(DocRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    }
    /*
        x = kilo
        y =boy
        z = yas
        */
    const HandleUpdateKcal = async() => {
        var newCal = Kcal(x = parseInt(data["Weight"]), y = parseInt(data["Height"]), z = parseInt(data["Age"]), c = data["Cinsiyet"])
        console.log("newCal: ", newCal)

        await updateDoc(doc(db, "User", userMail), {
            Kcal: parseInt(newCal).toString(),
        });
    }



    return (
        <ScrollView style={styles.cont} >
            <View

                style={styles.contHeader} >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")
                    }

                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Ionicons name="ios-arrow-back-sharp" size={50} color={Color.accent1} />

                    <Text style={styles.Header} > Ayarlar</Text></TouchableOpacity>
            </View>

            <View style={styles.contContent} >
                <Text style={styles.litteHeader} >Bilgiler</Text>
                <Text style={styles.litteText}>İsim: {data["Ad"]}</Text>
                <Text style={styles.litteText}>Soyisim: {data["Soyad"]}</Text>
                <Text style={styles.litteText}>Yaş: {data["Age"]}</Text>
                <Text style={styles.litteText}>Boy: {data["Height"]}</Text>
                <Text style={styles.litteText}>Kilo: {data["Weight"]}</Text>
                <Text style={styles.litteText}>Adım sayısı (günlük): {data["Step"]}</Text>
                <Text style={styles.litteText}>Kcal (günlük): {data["Kcal"]}</Text>


                <Text style={styles.litteText} >E-Mail: <Text style={[styles.litteText, { color: Color.accent1 }]} >{userMail}</Text></Text>

                <Text style={styles.litteHeader} >Güncelle</Text>
                <FieldChecker title='Boy' onPress={(d) => UpdateField("Height",d)} />
                <FieldChecker title='Kilo' onPress={(d) => UpdateField("Weight", d)} />
                <FieldChecker title='Adım sayısı' onPress={(d) => UpdateField("Step", d)} />
                <FieldChecker title='Yaş' onPress={(d) => UpdateField("Age", d)} />
                <SubmitBtn
                    title={" Yeni Kcal"}
                    onPress={HandleUpdateKcal}


                />

                <Text style={styles.litteHeader} >Kimlik Doğrulama</Text>
                <TouchableOpacity
                    onPress={LogOut}
                    style={{ flexDirection: "row" }}
                >

                    <Text style={styles.litteText} >Çıkış yap</Text>

                </TouchableOpacity>



            </View>


        </ScrollView>
    )
}

export default Settings

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: `#f5fffa`,

    },
    contHeader: {
        marginHorizontal: 20,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        //marginTop: -10,
        borderBottomWidth: 1,
        borderColor: Color.txt,
        backgroundColor: "lightGray",
        marginTop: Platform.OS === 'ios' ? -10 : 40,
    },
    contContent: {
        marginHorizontal: 20,
        backgroundColor: "lightGray",
        flex: 7
    },
    Header: {
        fontSize: 30,
        fontWeight: "700",
        color: Color.accent1,
        backgroundColor: "lightGray",
    },
    litteHeader: {
        fontSize: 20,
        color: Color.accent1,
        marginVertical: 15,
        fontWeight: "600",
        backgroundColor: "lightGray",
    },
    litteText: {
        fontSize: 20,
        color: Color.txt,
        fontWeight: "400",
        marginVertical: 8,
        backgroundColor: "lightGray",
    },
})