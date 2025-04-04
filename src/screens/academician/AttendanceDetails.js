import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AttendanceDetails = ({ route }) => {
  const { courseId } = route.params;

  // Örnek yoklama verisi: Tarih ve öğrencinin yoklama durumu
  const [attendanceData, setAttendanceData] = useState([
    { date: '2023-08-01', present: true },
    { date: '2023-08-02', present: false },
    { date: '2023-08-03', present: true },
    { date: '2023-08-04', present: false },
    { date: '2023-08-05', present: true },
  ]);

  useEffect(() => {
    // API çağrısı yapılacaksa burada yapılabilir
    console.log(`Ders ID: ${courseId} için yoklama verileri yükleniyor...`);
  }, [courseId]);

  return (
    <ScrollView style={styles.container}>
      {attendanceData.map((item, index) => (
        <Surface key={index} style={styles.attendanceItem}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Ionicons
            name={item.present ? 'checkmark-circle-outline' : 'close-circle-outline'}
            size={24}
            color={item.present ? '#4CAF50' : '#F44336'}
          />
        </Surface>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AttendanceDetails;