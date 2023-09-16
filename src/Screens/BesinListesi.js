import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BesinListesi = () => {
  const [besinler, setBesinler] = useState([]);

  useEffect(() => {
    const fetchBesinler = async () => {
      const data = await getBesinlerBelgesi();
      if (data) {
        setBesinler(Object.entries(data));
      }
    };

    fetchBesinler();
  }, []);

  const handleBesinTiklama = (kalori) => {
    // Kaloriyi toplam kaloriye eklemek için gerekli kodu burada yazabilirsiniz
    console.log('Seçilen besinin kalorisi:', kalori);
  };

  return (
    <View>
      <Text>Besin Listesi:</Text>
      {besinler.map(([besinAdi, kalori]) => (
        <TouchableOpacity
          key={besinAdi}
          onPress={() => handleBesinTiklama(kalori)}
        >
          <Text>{besinAdi}: {kalori} kalori</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BesinListesi;
