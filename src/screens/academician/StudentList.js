import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StudentList = ({ navigation }) => {
  // Öğrenci listesi örnek verisi
  const [students, setStudents] = useState([
    { id: 'S001', name: 'Ali Yılmaz', attendances: ['2025-03-01', '2025-03-03', '2025-03-05'] },
    { id: 'S002', name: 'Ayşe Demir', attendances: ['2025-03-02', '2025-03-04'] },
    { id: 'S003', name: 'Mehmet Kara', attendances: ['2025-03-01', '2025-03-04', '2025-03-05'] },
    { id: 'S004', name: 'Fatma Kılıç', attendances: ['2025-03-03', '2025-03-05'] },
  ]);

  // Öğrenciye tıklandığında yoklama bilgilerini gösterme
  const handleStudentPress = (student) => {
    navigation.navigate('AttendanceDetails', { studentId: student.id, studentName: student.name, attendances: student.attendances });
  };

  // Öğrenci listesini render etme
  const renderItem = ({ item }) => (
    <Surface style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentAttendanceCount}>Yoklama Sayısı: {item.attendances.length}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => handleStudentPress(item)}
      >
        <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.studentList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  studentList: {
    padding: 16,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  studentAttendanceCount: {
    fontSize: 14,
    color: '#666',
  },
  viewButton: {
    padding: 8,
  },
});

export default StudentList;
