import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import Color from '../Styles/colors'
import NewTextInput from '../components/TextInput'
import SubmitBtn from '../components/SubmitBtn'

import { useNavigation } from "@react-navigation/core"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";
import { auth, db } from '../firebase/firebase'

const Login = () => {
    const [SubmitText, setSubmitText] = useState("Giriş")
    const [ChangeTxt, setChangeTxt] = useState("HESABINIZ YOK MU?")
    const [email, setEmail] = useState("")
    const [passw, setPassw] = useState("")

    const navigation = useNavigation()
    const ChangeType = async () => {
        if (SubmitText == "Giriş") {
            setSubmitText("Kayıt ol")
            setChangeTxt("HESABINIZ VAR MI?")
        }
        else {
            setSubmitText("Giriş")
            setChangeTxt("HESABINIZ YOK MU?")
        }



    }
    const Submit = async () => {

        if (SubmitText == "Giriş") {
            console.log("handleLogin");
            signInWithEmailAndPassword(auth, email, passw)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User Sign In Successful: " + user.email);
                    //console.log(user.uid);
                    //console.log(user);
                    navigation.navigate("Home")



                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });


        } else {
            console.log("handleSingUp");
            createUserWithEmailAndPassword(auth, email, passw)
                .then((userCredential) => {
                    console.log("signedup");
                    navigation.navigate("GetData")
                   

                   // setSubmitText("Login")

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;



                });

        }




    }



    return (
        <View style={styles.cont} >
             
             <Image source ={require('../images/penuicon.png')}
                style ={styles.IconImage} resizeMode='contain'></Image>
             

            <View style={styles.LoginCont} >
                <Text style={styles.Header}>{SubmitText}</Text>
                <Text style={styles.LitteHeader}> beslenmeni kontrol etmeye başla...</Text>
                <NewTextInput
                    iconName={"mail"}
                    Name={"E-mail"}
                    value={email}
                    onChangeText={(data) => setEmail(data)}
                />
                <NewTextInput
                    value={passw}
                    iconName={"lock"}
                    Name={"Password"}
                    onChangeText={(data) => setPassw(data)}
                    lock={true}
                />
                <SubmitBtn
                    title={SubmitText}
                    onPress={Submit}
                />
                <TouchableOpacity
                    onPress={ChangeType}
                >

                    <Text style={[styles.LitteHeader, {
                        textAlign: "center",
                        fontSize: 17,
                        color: Color.main,
                        letterSpacing: 1,
                        fontWeight: "bold"
                    }]}>{ChangeTxt}</Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    cont: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",



    },

    Header: {
        fontSize: 50,
        textAlign: "left",
        marginTop:10,
        color: Color.main,
        fontWeight: "700",


    },
    LitteHeader: {
        fontSize: 15.3,
        textAlign: "left",
        color: Color.txt,
        fontWeight: "700",
        letterSpacing: 1




    },

    LoginCont: {
        backgroundColor: "white",
        margin: 20,

        flex: .8,

    },
    contHead: {
        backgroundColor: "red",
        flex: 1,
    },
    IconImage:{
      
        width:250,
        
        height:90,
        marginLeft:75,
    },


})