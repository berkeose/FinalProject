import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const WaterCounter = () => {
  const [count, setCount] = useState(0);
  const maxCount = 4; // Maksimum içme miktarı
  const literSize = 1; // Litre cinsinden su miktarı

  useEffect(() => {
    if (count === maxCount) {
      // Hedefe ulaşıldığında not gönder
      Alert.alert('Hedefe Ulaştın', 'Tebrikler! Hedefinize ulaştınız.');
    }
  }, [count]);

  const incrementCount = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  // İlerleme yüzdesini hesaplayın
  const progress = (count / maxCount) * 100;

  return (
    <View style={styles.container}>
      <Svg style={styles.progressContainer} width={200} height={200}>
        <Circle
          cx={100}
          cy={100}
          r={90}
          stroke="#e0e0e0"
          strokeWidth={20}
          fill="none"
        />
        <Circle
          cx={100}
          cy={100}
          r={90}
          stroke="#7fffd4"
          strokeWidth={20}
          strokeDasharray={`${progress} ${100 - progress}`}
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 100 100)"
        />
       
        <Text style={styles.literText}>{(count * literSize).toFixed(2)}L</Text>
      </Svg>
      <TouchableOpacity style={styles.button} onPress={incrementCount}>
        <Text style={styles.buttonText}>Su İç</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={resetCount}>
        <Text style={styles.resetButtonText}>Sıfırla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 20,
  },
  countText: {
    position: 'absolute',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    top: '40%',
    left: 0,
    right: 0,
  },
  literText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    top: '50%',
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#7fffd4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterCounter;
