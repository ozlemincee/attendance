import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Schedule = ({ navigation }) => {
  // Örnek ders programı verisi
  const scheduleData = [
    { day: 'Pazartesi', courses: ['09:00 - 10:30: Programlama Temelleri', '13:00 - 14:30: Matematik I'] },
    { day: 'Salı', courses: ['10:00 - 11:30: Veri Yapıları', '15:00 - 16:30: Fizik I'] },
    { day: 'Çarşamba', courses: ['09:00 - 10:30: Veritabanı Sistemleri', '14:00 - 15:30: Algoritmalar'] },
    { day: 'Perşembe', courses: ['11:00 - 12:30: Bilgisayar Mimarisi'] },
    { day: 'Cuma', courses: ['13:00 - 14:30: Yapay Zeka', '15:00 - 16:30: Mobil Programlama'] },
  ];

  return (
    <View style={styles.container}>
   
      {/* Ders Programı Listesi */}
      <ScrollView contentContainerStyle={styles.content}>
        {scheduleData.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{item.day}</Text>
            {item.courses.map((course, courseIndex) => (
              <Text key={courseIndex} style={styles.courseItem}>
                {course}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Stil Tanımları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  content: {
    padding: 16,
  },
  dayContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  courseItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default Schedule;
