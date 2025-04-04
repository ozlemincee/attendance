import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Surface } from 'react-native-paper';

const Reports = ({ navigation }) => {
  const [reportData, setReportData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('weekly'); // 'weekly' or 'monthly'

  // Dummy data for the reports
  const dummyReportData = [
    {
      courseId: 'CS101',
      courseName: 'Programlama Temelleri',
      attendanceData: [
        { date: '2025-03-10', studentCount: 40 },
        { date: '2025-03-17', studentCount: 42 },
        { date: '2025-03-24', studentCount: 38 },
      ],
    },
    {
      courseId: 'CS202',
      courseName: 'Veri Yapıları',
      attendanceData: [
        { date: '2025-03-11', studentCount: 36 },
        { date: '2025-03-18', studentCount: 39 },
        { date: '2025-03-25', studentCount: 37 },
      ],
    },
    {
      courseId: 'CS303',
      courseName: 'Veritabanı Sistemleri',
      attendanceData: [
        { date: '2025-03-12', studentCount: 41 },
        { date: '2025-03-19', studentCount: 43 },
        { date: '2025-03-26', studentCount: 40 },
      ],
    },
  ];

  useEffect(() => {
    // Fetch actual report data from API (replace with real API call in a real app)
    // Example: fetchReports().then(data => setReportData(data));
    setReportData(dummyReportData);
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const renderAttendanceData = (attendanceData) => {
    const filteredData = attendanceData.filter((entry) => {
      const currentDate = new Date();
      const entryDate = new Date(entry.date);
      if (selectedFilter === 'weekly') {
        // Filter for the last week
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        return entryDate >= weekAgo;
      } else if (selectedFilter === 'monthly') {
        // Filter for the last month
        const monthAgo = new Date();
        monthAgo.setMonth(currentDate.getMonth() - 1);
        return entryDate >= monthAgo;
      }
      return true;
    });

    return filteredData.map((entry, index) => (
      <Surface key={index} style={styles.attendanceCard}>
        <Text style={styles.attendanceDate}>{entry.date}</Text>
        <Text style={styles.attendanceCount}>Öğrenci Sayısı: {entry.studentCount}</Text>
      </Surface>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'weekly' && styles.selectedFilter]}
          onPress={() => handleFilterChange('weekly')}
        >
          <Text style={styles.filterText}>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'monthly' && styles.selectedFilter]}
          onPress={() => handleFilterChange('monthly')}
        >
          <Text style={styles.filterText}>Aylık</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reportData}
        keyExtractor={(item) => item.courseId}
        renderItem={({ item }) => (
          <Surface style={styles.courseCard}>
            <Text style={styles.courseName}>{item.courseName}</Text>
            {renderAttendanceData(item.attendanceData)}
          </Surface>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectedFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  courseCard: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  attendanceCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  attendanceDate: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  attendanceCount: {
    fontSize: 14,
    color: '#4CAF50',
  },
});

export default Reports;
