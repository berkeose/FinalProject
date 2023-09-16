import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase/firebase';
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

import { useRoute, useNavigation } from '@react-navigation/native';
import Color from '../Styles/colors';

const Veri = ({ onTamamlandiCallback }) => {
  const [data, setData] = useState([]);
  const route = useRoute();
  const Params = route.params?.data || {};
  const [toplamKalori, setToplamKalori] = useState(0);
  const navigation = useNavigation();
  const userMail = auth.currentUser?.email;

  const onTamamlandi = async () => {
        
    try {
      const docRef = doc(db, "User", userMail);  // Farklı koleksiyon ve belge kimliği   const docRef = doc(db, "kullanıcıkalori", "kullanıcıaperatifcal"); 
      await setDoc(docRef, {
       toplamKalori:toplamKalori
      },{merge:true});
      console.log("Veri Firebase'e gönderildi.");
    } catch (error) {
      console.error("Firebase yazma hatası:", error);
    }
    navigation.navigate('Home', { toplamKalori: toplamKalori });
  };
  

  const sifirla = () => {
    setToplamKalori(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const muzDocRef = doc(db, 'deneme', 'Muz');
        const muzSnapshot = await getDoc(muzDocRef);
        const muzData = muzSnapshot.data();
        const muzKalori = muzData ? parseInt(muzData.Kalori) : 0;

        const çilekDocRef = doc(db, 'deneme', 'Çilek');
        const çilekSnapshot = await getDoc(çilekDocRef);
        const çilekData = çilekSnapshot.data();
        const çilekKalori = çilekData ? parseInt(çilekData.Kalori) : 0;

        const bademDocRef = doc(db, 'deneme', 'Badem');
        const bademSnapshot = await getDoc(bademDocRef);
        const bademData = bademSnapshot.data();
        const bademKalori = bademData ? parseInt(bademData.Kalori) : 0;

        const CevizDocRef = doc(db, 'deneme', 'Ceviz');
        const CevizSnapshot = await getDoc(CevizDocRef);
        const CevizData = CevizSnapshot.data();
        const CevizKalori = CevizData ? parseInt(CevizData.Kalori) : 0;

        const FındıkDocRef = doc(db, 'deneme', 'Fındık');
        const FındıkSnapshot = await getDoc(FındıkDocRef);
        const FındıkData = FındıkSnapshot.data();
        const FındıkKalori = FındıkData ? parseInt(FındıkData.Kalori) : 0;

        const GreyfurtDocRef = doc(db, 'deneme', 'Greyfurt');
        const GreyfurtSnapshot = await getDoc(GreyfurtDocRef);
        const GreyfurtData = GreyfurtSnapshot.data();
        const GreyfurtKalori = GreyfurtData ? parseInt(GreyfurtData.Kalori) : 0;

        const KurukayısıDocRef = doc(db, 'deneme', 'Kuru kayısı');
        const KurukayısıSnapshot = await getDoc(KurukayısıDocRef);
        const KurukayısıData = KurukayısıSnapshot.data();
        const KurukayısıKalori = KurukayısıData ? parseInt(KurukayısıData.Kalori) : 0;

        const YesilelmaDocRef = doc(db, 'deneme', 'Yeşil elma');
        const YesilelmaSnapshot = await getDoc(YesilelmaDocRef);
        const YesilelmaData = YesilelmaSnapshot.data();
        const YesilelmaKalori = YesilelmaData ? parseInt(YesilelmaData.Kalori) : 0;

        const YabanmersiniDocRef = doc(db, 'deneme', 'Yaban Mersini');
        const YabanmersiniSnapshot = await getDoc(YabanmersiniDocRef);
        const YabanmersiniData = YabanmersiniSnapshot.data();
        const YabanmersiniKalori = YabanmersiniData ? parseInt(YabanmersiniData.Kalori) : 0;

        const DilimkarpuzDocRef = doc(db, 'deneme', 'Dilim karpuz');
        const DilimkarpuzSnapshot = await getDoc(DilimkarpuzDocRef);
        const DilimkarpuzData = DilimkarpuzSnapshot.data();
        const DilimkarpuzKalori = DilimkarpuzData ? parseInt(DilimkarpuzData.Kalori) : 0;

        const KuruincirDocRef = doc(db, 'deneme', 'Kuru incir');
        const KuruincirSnapshot = await getDoc(KuruincirDocRef);
        const KuruincirData =KuruincirSnapshot.data();
        const KuruincirKalori = KuruincirData ? parseInt(KuruincirData.Kalori) : 0;

        


        const newData = [
          { besin: 'Muz', kalori: muzKalori },
          { besin: 'Çilek', kalori: çilekKalori },
          { besin: 'Badem', kalori: bademKalori },
          { besin: 'Ceviz', kalori: CevizKalori },
          { besin: 'Fındık', kalori: FındıkKalori },
          { besin: 'Greyfurt', kalori: GreyfurtKalori },
          { besin: 'Kuru kayısı', kalori: KurukayısıKalori },
          { besin: 'Yeşil elma', kalori: YesilelmaKalori},
          { besin: 'Yaban Mersini', kalori: YabanmersiniKalori},
          { besin: 'Dilim karpuz', kalori: DilimkarpuzKalori},
          { besin: 'Kuru incir', kalori: DilimkarpuzKalori},
        ];

        setData(newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const alinanKalori = Params?.alinanKalori ? parseFloat(Params.alinanKalori) : 0;
            const yeniKalori = alinanKalori + item.kalori;
            const yeniToplamKalori = toplamKalori + item.kalori;
            console.log('Yeni Kalori:', yeniKalori);

            setToplamKalori(yeniToplamKalori);
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.itemTxt}>
          {item.besin}: {item.kalori} kalori
        </Text>
        <TouchableOpacity
          style={styles.minusButton}
          onPress={() => {
            const alinanKalori = Params?.alinanKalori ? parseFloat(Params.alinanKalori) : 0;
            const yeniKalori = alinanKalori - item.kalori;
            const yeniToplamKalori = toplamKalori - item.kalori;
            console.log('Yeni Kalori:', yeniKalori);

            setToplamKalori(yeniToplamKalori);
          }}
        >
          <Ionicons name="remove" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.toplamKaloriText}>Toplam Kalori: {toplamKalori}</Text>
        <FlatList renderItem={renderItem} data={data} keyExtractor={(item) => item.besin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Tamamlandı" onPress={onTamamlandi} />
        <Button title="Toplam Kaloriyi Sıfırla" onPress={sifirla} />
      </View>
    </View>
  );
};

export default Veri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  cont: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  itemTxt: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  addButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  minusButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toplamKaloriText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
