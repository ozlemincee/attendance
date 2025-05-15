

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Seçimi kaydetmek için Async Storage

// Eğer ActionSheetIOS kullanacaksanız
// import { ActionSheetIOS } from 'react-native'; 
// Veya cross-platform bir kütüphane (örn: @expo/action-sheet veya react-native-action-sheet)

const StudentSettings = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('tr'); // Varsayılan dil

  // Uygulama yüklendiğinde kaydedilmiş dili yükle
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('appLanguage');
        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
          // Burada uygulamanın dilini gerçekten değiştiren bir kod olmalı (i18n kütüphanesi ile)
          console.log(`Uygulama dili ${savedLanguage} olarak ayarlandı (Simule Edildi)`);
        }
      } catch (error) {
        console.error('Dil yüklenirken hata oluştu:', error);
      }
    };

    loadLanguage();
  }, []); // Component ilk yüklendiğinde çalışır

  // Dil değiştirmeyi simule eden fonksiyon
  const changeLanguage = async (languageCode) => {
    try {
      await AsyncStorage.setItem('appLanguage', languageCode);
      setSelectedLanguage(languageCode);
      // Burada uygulamanın dilini gerçekten değiştiren bir kod olmalı (i18n kütüphanesi ile)
      Alert.alert('Başarılı', `Dil ${languageCode === 'tr' ? 'Türkçe' : 'English'} olarak ayarlandı. (Simule Edildi)\nGerçek dil değişikliği için uygulamayı yeniden başlatmanız gerekebilir.`);
      console.log(`Dil ${languageCode} olarak ayarlandı ve kaydedildi (Simule Edildi)`);
    } catch (error) {
      console.error('Dil kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Dil ayarı kaydedilemedi.');
    }
  };

  // Dil seçme seçeneklerini göster (Basit bir Alert ile simule edelim)
  const showLanguagePicker = () => {
      Alert.alert(
          'Dil Seçin',
          'Uygulama dilini seçin.',
          [
              {
                  text: 'Türkçe',
                  onPress: () => changeLanguage('tr'),
                  style: selectedLanguage === 'tr' ? 'default' : 'default' // Aktif seçeneği vurgulama (Alert'te sınırlı)
              },
              {
                  text: 'English',
                  onPress: () => changeLanguage('en'),
                   style: selectedLanguage === 'en' ? 'default' : 'default'
              },
              {
                  text: 'İptal',
                  style: 'cancel'
              }
          ]
      );
     
  };


  // Ayar öğelerine tıklandığında yapılacak işlemler
  const handleSettingPress = (settingKey) => {
    console.log(`${settingKey} Ayarına Tıklandı`);
    switch (settingKey) {
        
        case 'language':
            // Dil seçiciyi göster
            showLanguagePicker();
            break;
        case 'help':
            // Yardım ekranına yönlendir veya modal aç
             Alert.alert('Yardım', 'Yardım ekranı/logic\'i buraya gelecek.');
            break;
        case 'about':
            // Hakkında ekranına yönlendir veya modal aç
             Alert.alert('Hakkında', 'Hakkında ekranı/logic\'i buraya gelecek.');
            break;
        default:
            console.warn(`Bilinmeyen ayar anahtarı: ${settingKey}`);
    }
  };

  // Seçili dilin görünen adını al
  const getLanguageName = (code) => {
      switch (code) {
          case 'tr':
              return 'Türkçe';
          case 'en':
              return 'English';
          default:
              return 'Bilinmiyor';
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Uygulama Ayarları Bölümü */}
        <Text style={styles.sectionTitle}>Uygulama Ayarları</Text>
         <Surface style={styles.settingsCard}>
          {/* Bildirim Ayarları */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('notifications')} // Anahtar (key) kullanın
          >
            <Ionicons name="notifications-outline" size={24} color="#FFC107" style={styles.settingIcon} />
            <Text style={styles.settingText}>Bildirim Ayarları</Text>
             <Ionicons name="chevron-forward" size={24} color="#B0B0B0" />
          </TouchableOpacity>
           <View style={styles.separator}></View>

          {/* Dil */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('language')} // Anahtar (key) kullanın
          >
            <Ionicons name="language-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingText}>Dil</Text>
            {/* Seçili dili sağda göster */}
            <Text style={styles.selectedValueText}>{getLanguageName(selectedLanguage)}</Text>
             <Ionicons name="chevron-forward" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </Surface>

        {/* Diğer Bölümler */}
        <Text style={styles.sectionTitle}>Diğer</Text>
        <Surface style={styles.settingsCard}>
           {/* Yardım */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('help')} // Anahtar (key) kullanın
          >
            <Ionicons name="help-circle-outline" size={24} color="#9C27B0" style={styles.settingIcon} />
            <Text style={styles.settingText}>Yardım</Text>
             <Ionicons name="chevron-forward" size={24} color="#B0B0B0" />
          </TouchableOpacity>
           <View style={styles.separator}></View>

           {/* Hakkında */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('about')} // Anahtar (key) kullanın
          >
            <Ionicons name="information-circle-outline" size={24} color="#607D8B" style={styles.settingIcon} />
            <Text style={styles.settingText}>Hakkında</Text>
             <Ionicons name="chevron-forward" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </Surface>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 5,
  },
  settingsCard: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
   selectedValueText: { // Dil seçeneğinin sağında görünecek metin stili
    fontSize: 16,
    color: '#777',
    marginRight: 10, // Ok ile arasında boşluk
   },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 15,
  },
});

export default StudentSettings;