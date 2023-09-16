import {
  StyleSheet, View,
  Text, ViewPlatform, ScrollView, Button, Touchable, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../Styles/colors'
import Secim from '../components/Secim'
import { Ionicons } from '@expo/vector-icons';
import {
  doc, setDoc,
  updateDoc, collection,
  addDoc, getDoc, getDocs,
  query, where, onSnapshot, orderBy, limit, firestore
} from "firebase/firestore";
import SubmitBtn from '../components/SubmitBtn';
import CustomButtoni from '../components/CustomButtoni';

import { auth, db } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import Veri from './Veri';
import Menu from './Menu'
import CustomButton from '../components/CustomButtoni';
import WaterCounter from './WaterCounter';
import AnotherCustomButton from '../components/AnotherCustomButton';






const MainTab = ({ route }) => {
 // const veriler = ["Veri 1", "Veri 2", "Veri 3", "Veri 4", "Veri 5"];
  const [oneri, setOneri] = useState('');
  const [randomOneri, setRandomOneri] = useState("");
  const [calvericekme ,setCalvericekme]= useState("")
  const [calcekme ,setCalcekme]= useState("")
  //const { veri } = route.params ? route.params : {}; //kullanılacaksa menudeki onTamamlandiyi güncelle
  //const toplamKalori = route.params?.toplamKalori || 0; // route.params'ın undefined olduğunda varsayılan değeri 0 olarak atar 
  const [kalori, setKalori] = useState();
  const [kullanıcıkalori, setkullanıcıKalori] = useState();

  const [besin, setBesin] = useState()
  const [Cal, setCal] = useState("200")
  const [Adim, setAdim] = useState("400")
  const [data, setdata] = useState({})
  const [Incoming, setIncoming] = useState({})
  const [Cals, setCals] = useState([])
  const navigation = useNavigation();
  const [stepValue, setStepValue] = useState()
  const userMail = auth.currentUser?.email;

  


   const fetchVeriData = async () => {
    try {
      const docRef = doc(db, "User", userMail); // Farklı koleksiyon ve belge kimliği const docRef = doc(db, "User", userMail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setkullanıcıKalori(data.Veri);
      } else {
        console.log("Belge bulunamadı!");
      }
    } catch (error) {
      console.error("Firebase veri alma hatası:", error);
    }
    console.log("bastı");
  };
  
  

  const fetchMenuData = async () => {
    try {
       const docRef = doc(db, "User", userMail);  //  const docRef = doc(db, "kullanıcıkalori", "kullanıcıaperatifcal");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setKalori(data.toplamKalori);
      } else {
        console.log("Belge bulunamadı!");
      }
    } catch (error) {
      console.error("Firebase veri alma hatası:", error);
    }
  };


/*  useEffect(() => {
    setKalori(toplamKalori);
  }, [toplamKalori]);
*/



  const getBesinlerBelgesi = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('besin')
        .doc('besinler')
        .get();

      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        return data;
      }

      return null;
    } catch (error) {
      console.error('Firestore belge alım hatası:', error);
      return null;
    }
  };


  const getBesinlerBelgesii = async () => {
    try {
      const documentSnapshot = await getDocs()
        .collection('besin')
        .doc('besinler')
        .get();

      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        return data;
      }

      return null;
    } catch (error) {
      console.error('Firestore belge alım hatası:', error);
      return null;
    }
  };


  const getBesinler = async () => {
    const querySnapshot = await firestore().collection('besin').get();
    const besinler = [];

    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      besinler.push(data);
    });

    return besinler;
  };

  //alt gpt
  const fetchItemFromFirestore = async () => {
    const q = query(collection(db, "Menu"), where("isim", '==', ["Muz"]));
    try {
      Cals.length = 0;
      const docRef = doc(db, 'besin', 'besinler'); // 'besin' koleksiyonunda 'besinler' belgesini hedefleyin
      const docSnap = await getDoc(docRef); // Belgeyi alın
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        Cals.push(doc.id)
      }
      )
      console.log("oldumu", Cals);

      if (docSnap.exists()) {
        // Belge mevcutsa verileri alın
        const data = docSnap.data();
        // console.log('Çilek:', data.Çilek);
        //console.log('Muz:', data.Muz);
      } else {
        console.log('Belge bulunamadı');
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
    navigation.navigate('Veri', { data })
  };
  /// yukarısı gpt
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

  


  const KiloVer = async () => {
    console.log("KiloVer")
    const q = query(collection(db, "Menu"), where("Kalori", '<', data["Kcal"]), orderBy("Kalori", "desc"));
    try {
      Cals.length = 0;
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.i);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ");
        Cals.push(doc.id);
        //return;

      });
      console.log("KiloVer", Cals);
      Cals.shift()



      var randomIndex = Math.floor(Math.random() * Cals.length);
      var randomElement = Cals[randomIndex];


      console.log(Cals)
      console.log("randomElement: ", randomElement)
      const data = {
        Cal: randomElement
      };
      navigation.navigate('Menu', { data });


      //console.log("Income received: ", Incoming.toString())
    } catch (error) {
      console.log("Error fetching data: ", error);
    }




  }
  const KiloSabit = async () => {
    console.log("KiloSabit")
    //const q = query(collection(db, "Menu"), where("Kalori", '<', data["Kcal"]), orderBy("Kcal"), limit(1));
    const q = query(collection(db, "Menu"), where("Kalori", '<=', data["Kcal"]), orderBy("Kalori", "desc"), limit(1));
    try {
      Cals.length = 0;
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.i);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ");
        Cals.push(doc.id);
        //return;

      });

      console.log("KiloSabit", Cals);
      var randomIndex = Math.floor(Math.random() * Cals.length);
      var randomElement = Cals[randomIndex];
      console.log(Cals)
      console.log("randomElement: ", randomElement)
      const data = {
        Cal: randomElement
      };
      navigation.navigate('Menu', { data });


      //console.log("Income received: ", Incoming.toString())
    } catch (error) {
      console.log("Error fetching data: ", error);
    }




  }
  const KiloAl = async () => {

    console.log("KiloAl")
    const q = query(collection(db, "Menu"), where("Kalori", '>', data["Kcal"]));
    try {
      Cals.length = 0;
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.i);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ");
        Cals.push(doc.id);
        //return;

      });

      console.log("KiloAl", Cals);

      var randomIndex = Math.floor(Math.random() * Cals.length);
      var randomElement = Cals[randomIndex];


      console.log(Cals)
      console.log("randomElement: ", randomElement)
      const data = {
        Cal: randomElement
      };
      navigation.navigate('Menu', { data });


      //console.log("Income received: ", Incoming.toString())
    } catch (error) {
      console.log("Error fetching data: ", error);
    }



  }

  const fetchOneri = async () => {
    try {
      const docRef = doc(db, "oneriler", "Auto-Id");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const oneriler = data["Tavuk ve Spor"];
        const randomIndex = Math.floor(Math.random() * oneriler.length);
        const randomOneri = oneriler[randomIndex];
        setRandomOneri(randomOneri);
      } else {
        console.log("Belge bulunamadı");
      }
    } catch (error) {
      console.error("Oneriyi alma hatası:", error);
    }
  };


  useEffect(() => {
    fetchOneri();
  }, []);





  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };





  useEffect(() => {
    const Step = data.Step * 0.05;
    setStepValue(Step);
  }, [data.Step]);

 /* const veriSayi = parse(data.Veri); // data.Veri'yi sayıya dönüştür
const toplamKaloriSayi = parseInt(data.toplamKalori); // data.toplamKalori'yi sayıya dönüştür
const toplam = veriSayi + toplamKaloriSayi;*/





  return (
    <ScrollView style={styles.cont} >

      <View style={styles.HeaderCont} >
        <Text style={styles.HeaderTxt}>Bilgileriniz :</Text>
        <View style={styles.HeaderBottomCont} >

          <View style={styles.LeftCont} >
            <Text style={styles.SubHeader}>Alınması gereken kalori: <Text style={{ fontWeight: "600", }}>{data["Kcal"]}</Text>
            </Text>
           
            

            
            <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.SubHeader}>Alınan Kalori: {data.Veri}</Text>
        <AnotherCustomButton
          title=''
          icoName='refresh'
          onPress={fetchVeriData}
          style={styles.customButton}
        />
      </View>
    </View>



           
            <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.SubHeader}>Alınan aperatifle Kalori: {data.toplamKalori}</Text>
        <AnotherCustomButton
          title=''
          icoName='refresh'
          onPress={fetchMenuData}
          style={styles.customButton}
        />
      </View>
    </View>
   

    <View style ={styles.adımWrapper}>
    <Text style={styles.SubHeader}>Günlük adım sayısı: <Text style={{ fontWeight: "600", }}>{data["Step"]}</Text>
            </Text>
            <Text style={styles.SubHeader}>Adım ile yakılan Kalori: {stepValue} <Text style={{ fontWeight: "800", }}></Text>

            </Text>

            
            </View>        
          


           





          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}

            style={styles.RightCont} >

            <Ionicons name="settings-sharp" size={40} color={Color.accent1} />
          </TouchableOpacity>
        </View>

      </View>



      <View style={styles.KiloWrapper}>

       
          <Text style={styles.categoriesTitle}> Tavsiye, {randomOneri}</Text>
       

        <View style={styles.ContentCont} >
          <View style={styles.SecimCont} >
            <Secim style={styles.SecimWrapper}
              onPress={KiloVer}
              title='Kilo  Ver' icoName='long-arrow-down' />
            <Secim
              onPress={KiloSabit}
              title='Kilo  Koru' icoName='minus' />
            <Secim
              onPress={KiloAl}
              title='Kilo   Al' icoName='long-arrow-up' />
          </View>
        </View>
        <View style={styles.MenuCont} >
          <Text style={styles.categoriesTitle}>Aperatif yiyecek mi arıyorsun? </Text>


        </View>
        <CustomButton title='Aperatif ara' icoName='search' onPress={fetchItemFromFirestore} />
       
        

       

        <View style={styles.watercontainer}>
          <WaterCounter />
        </View>



      </View>


    </ScrollView>
  )
}

export default MainTab

const styles = StyleSheet.create({
  cont: {
    backgroundColor: `#f5fffa`,
    flex: 1
  },
  HeaderCont: {
    borderBottomWidth: 2,
    marginTop: Platform.OS === 'ios' ? 0 : 60,
    flex: 1,
    borderColor: "black",
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  HeaderCont1: {
    borderBottomWidth: 2,
    marginTop: Platform.OS === 'ios' ? 0 : 60,
    flex: 1,
    borderColor: "black",
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  ContentCont: {
    backgroundColor: "transparent",
    flex: 5,
    marginTop: 20,
  },
  HeaderTxt: {
    textAlign: 'left',
    fontSize: 33,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: Color.accent1,
  },
  SubHeader: {
    marginTop: 10,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "400",
    marginRight:0.5,
    fontFamily: "Arial"

  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    marginRight: 5,
  },
  customButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    height:5,
  },
  SecimCont: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1
  },
  MenuCont: {
    flex: 1,
  },
  SubSubHeader:{
    marginTop: 10,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "800",
    marginRight:0.5,
    fontFamily: "Arial"

  },
  LeftCont: {
    flex: 6,
  },
  RightCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  HeaderBottomCont: {
    flex: 1,
    flexDirection: "row"


  },
  SecimWrapper: {
    flex: 1,
    fontSize: 20,
  },
  KiloWrapper: {
    flex: 1,
    backgroundColor: `transparent`,
    margin: 0,
    marginLeft: 10,
    justifyContent: "center",

  },
  HeaderSubTxt: {
    textAlign: 'left',
    fontSize: 33,
    marginTop: 10,
    fontWeight: "400",
    marginBottom: 0.2,



  },
  categoriesTitle: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: 'lightgrey',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },

  watercontainer: {
    flex: 1,
    backgroundColor: '#transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  adımWrapper:{
    flex:1,
    marginTop:10,
    backgroundColor:`#f0ffff`,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },



})