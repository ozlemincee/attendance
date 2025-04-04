import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CourseDetails = ({ route, navigation }) => {
  const { courseName } = route.params;
  const [courseDetails, setCourseDetails] = useState({
    name: courseName,
    dates: [], // Başlangıçta boş bir dizi tanımlıyoruz
  });

  useEffect(() => {
    // Ders detaylarını API'den veya başka bir kaynaktan alın
    // Örnek: fetchCourseDetails(courseName).then(data => setCourseDetails(data));
    // Şimdilik örnek veri ekliyoruz
    setCourseDetails({
      name: courseName,
      dates: [
        { date: '2023-11-20', students: 45 },
        { date: '2023-11-27', students: 42 },
        { date: '2023-12-04', students: 40 },
      ],
    });
  }, [courseName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{courseDetails.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {courseDetails.dates.map((item) => (
          <Surface key={item.date} style={styles.dateCard}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.studentCount}>Katılımcı: {item.students}</Text>
            <TouchableOpacity
              style={styles.attendanceButton}
              onPress={() => navigation.navigate('StudentAttendance', { courseName: courseDetails.name, date: item.date })}
            >
              <Text style={styles.attendanceText}>Yoklama</Text>
            </TouchableOpacity>
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
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  studentCount: {
    fontSize: 14,
    color: '#666',
  },
  attendanceButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  attendanceText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});

export default CourseDetails;