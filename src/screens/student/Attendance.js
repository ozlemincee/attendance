import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Surface, Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Attendance = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const courses = [
    { id: 'all', name: 'Tüm Dersler' },
    { id: 'CS101', name: 'Programlama Temelleri' },
    { id: 'CS202', name: 'Veri Yapıları' },
    { id: 'CS303', name: 'Veritabanı Sistemleri' },
    { id: 'MATH101', name: 'Matematik I' },
  ];

  const getInitialAttendanceData = () => [
    { id: '1', courseId: 'CS101', courseName: 'Programlama Temelleri', date: new Date(2025, 3, 20, 10, 0), status: 'present', instructor: 'Dr. Ahmet Yıldız' },
    { id: '2', courseId: 'CS101', courseName: 'Programlama Temelleri', date: new Date(2023, 10, 8, 10, 0), status: 'present', instructor: 'Dr. Ahmet Yıldız' },
    { id: '3', courseId: 'CS202', courseName: 'Veri Yapıları', date: new Date(2023, 10, 2, 13, 0), status: 'absent', instructor: 'Dr. Mehmet Kaya' },
    { id: '4', courseId: 'CS202', courseName: 'Veri Yapıları', date: new Date(2023, 10, 9, 13, 0), status: 'present', instructor: 'Dr. Mehmet Kaya' },
    { id: '5', courseId: 'CS303', courseName: 'Veritabanı Sistemleri', date: new Date(2023, 10, 3, 15, 0), status: 'present', instructor: 'Prof. Dr. Zeynep Demir' },
    { id: '6', courseId: 'MATH101', courseName: 'Matematik I', date: new Date(2023, 10, 2, 9, 0), status: 'present', instructor: 'Dr. Ali Öztürk' },
    { id: '7', courseId: 'MATH101', courseName: 'Matematik I', date: new Date(2023, 10, 9, 9, 0), status: 'absent', instructor: 'Dr. Ali Öztürk' },
  ];

  useEffect(() => {
    setAttendanceData(filterAttendanceData());
  }, [selectedCourse, selectedDate]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const filterAttendanceData = () => {
    let filteredData = getInitialAttendanceData();

    if (selectedCourse !== 'all') {
      filteredData = filteredData.filter(item => item.courseId === selectedCourse);
    }

    if (selectedDate) {
      filteredData = filteredData.filter(item =>
        item.date.getDate() === selectedDate.getDate() &&
        item.date.getMonth() === selectedDate.getMonth() &&
        item.date.getFullYear() === selectedDate.getFullYear()
      );
    }

    return filteredData;
  };

  const getStatusText = (status) => (status === 'present' ? 'Var' : 'Yok');

  const getStatusColor = (status) => (status === 'present' ? '#4CAF50' : '#F44336');

  const formatDate = (date) => `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;

  const renderAttendanceItem = ({ item }) => (
    <Surface style={styles.attendanceCard}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.attendanceDetails}>
        <Text>{formatDate(item.date)}</Text>
        <Text>{item.instructor}</Text>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Ionicons name="calendar" size={24} color="#000" />
          <Text>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          {courses.map((course) => (
            <Picker.Item key={course.id} label={course.name} value={course.id} />
          ))}
        </Picker>
      </View>

      {attendanceData.length === 0 ? (
        <Text style={styles.noDataText}>Bu tarih ve ders için yoklama bulunamadı.</Text>
      ) : (
        <FlatList
          data={attendanceData}
          keyExtractor={(item) => item.id}
          renderItem={renderAttendanceItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  datePickerButton: { flexDirection: 'row', alignItems: 'center' },
  picker: { height: 50, width: 180 },
  attendanceCard: { padding: 16, marginVertical: 8, borderRadius: 8 },
  attendanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courseName: { fontSize: 16, fontWeight: 'bold' },
  statusBadge: { padding: 4, borderRadius: 4 },
  statusText: { color: 'white' },
  divider: { marginVertical: 8 },
  attendanceDetails: { marginTop: 8 },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' },
});

export default Attendance;
