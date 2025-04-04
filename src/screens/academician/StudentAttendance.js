import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StudentAttendance = ({ route, navigation }) => {
  const { courseId, date } = route.params;
  const [studentList, setStudentList] = useState([
    { id: '1', name: 'Ayşe Kaya', present: true },
    { id: '2', name: 'Mehmet Demir', present: false },
    { id: '3', name: 'Fatma Yılmaz', present: true },
    // ... (Öğrenci listesi)
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yoklama ({date})</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {studentList.map((student) => (
          <Surface key={student.id} style={styles.studentCard}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.attendanceStatus}>{student.present ? 'Var' : 'Yok'}</Text>
          </Surface>
        ))}
      </ScrollView>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  attendanceStatus: {
    fontSize: 14,
    color: '#666',
  },
});

export default StudentAttendance;