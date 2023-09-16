import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BesinlerBelgesiScreen = () => {
  const [belgeVerileri, setBelgeVerileri] = useState(null);

  useEffect(() => {
    const fetchBelgeVerileri = async () => {
      const data = await getBesinlerBelgesi();
      setBelgeVerileri(data);
    };

    fetchBelgeVerileri();
  }, []);

  if (!belgeVerileri) {
    return null; // Veri yüklenene kadar boş bir görünüm döndürme veya yükleniyor gösterebilirsiniz
  }

  return (
    <View>
      <Text>Belge Verileri:</Text>
      <Text>Öğe 1: {belgeVerileri.oge1}</Text>
      <Text>Öğe 2: {belgeVerileri.oge2}</Text>
      {/* Diğer veri alanlarını burada gösterebilirsiniz */}
    </View>
  );
};

export default BesinlerBelgesiScreen;
