// ./src/screens/auth/KvkkText.js

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper'; // Eğer Paper kütüphanesini kullanıyorsanız
import { kvkkText } from "../../data/kvkk"; // KVKK metnini import edin

const KvkkText = () => { // Ekran component'ini oluşturun
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Başlık - Eğer App.js'de headerShown: true ise bu gerekmeyebilir */}
        {/* <Text style={styles.title}>KVKK Aydınlatma Metni</Text> */}

        {/* KVKK metnini göster */}
        <Paragraph style={styles.kvkkText}>
          {kvkkText}
        </Paragraph>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16, // Ekran kenarlarına boşluk ekle
  },
  scrollViewContent: {
    // İçerik az olsa bile ScrollView'un flex: 1 almasını istiyorsanız
    // flexGrow: 1, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  kvkkText: {
    fontSize: 15,
    lineHeight: 24, // Metin satırları arasına boşluk
    color: '#555',
    // Paragraph component'i zaten alt ve üst marjin ekleyebilir, gerekirse ayarlayın
    margin: 0, 
  },
});

export default KvkkText; // Component'i dışa aktarın