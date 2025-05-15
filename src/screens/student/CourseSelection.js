// CourseSelection.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { allCoursesData } from '../../data/courses'; // Assuming courses.js is in ./data/

const CourseSelectionScreen = ({ route, navigation }) => {
  const { studentId, initialYear } = route.params;

  const [selectedYear, setSelectedYear] = useState(initialYear ? String(initialYear) : '1');
  const [selectedSemester, setSelectedSemester] = useState('Güz'); // 'Güz' or 'Bahar'
  const [selectedCourses, setSelectedCourses] = useState({}); // Using an object for easier toggle: {courseId: true/false}

  const availableYears = Object.keys(allCoursesData);

  const coursesToDisplay = useMemo(() => {
    if (allCoursesData[selectedYear] && allCoursesData[selectedYear][selectedSemester]) {
      return allCoursesData[selectedYear][selectedSemester];
    }
    return [];
  }, [selectedYear, selectedSemester]);

  useEffect(() => {
    // Reset selected courses when year or semester changes
    setSelectedCourses({});
  }, [selectedYear, selectedSemester]);

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleSubmitSelection = () => {
    const chosenCourses = coursesToDisplay.filter(course => selectedCourses[course.id]);
    if (chosenCourses.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir ders seçin.');
      return;
    }

    console.log('Student ID:', studentId);
    console.log('Selected Year for Courses:', selectedYear);
    console.log('Selected Semester:', selectedSemester);
    console.log('Chosen Courses:', chosenCourses.map(c => c.name));
    
    // Here you would typically send data to a backend
    Alert.alert(
      'Başarılı',
      'Ders seçimleriniz kaydedildi. Akademisyen onayı bekleniyor.',
      [{ text: 'Tamam', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Sınıf Yılı:</Text>
            <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            itemStyle={styles.pickerItem} // For iOS
            >
            {availableYears.map(year => (
                <Picker.Item key={year} label={`${year}. Sınıf`} value={year} />
            ))}
            </Picker>
        </View>
        <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Dönem:</Text>
            <Picker
            selectedValue={selectedSemester}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSemester(itemValue)}
            itemStyle={styles.pickerItem} // For iOS
            >
            <Picker.Item label="Güz Dönemi" value="Güz" />
            <Picker.Item label="Bahar Dönemi" value="Bahar" />
            </Picker>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {coursesToDisplay.length > 0 ? (
          coursesToDisplay.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[
                styles.courseItem,
                selectedCourses[course.id] && styles.courseItemSelected
              ]}
              onPress={() => toggleCourseSelection(course.id)}
            >
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name} ({course.id})</Text>
                <Text style={styles.courseDetails}>
                  Kredi: {course.credits} | AKTS: {course.ects} | Tür: {course.type} | Saat (T/U/L): {course.hours}
                </Text>
              </View>
              <Ionicons
                name={selectedCourses[course.id] ? "checkbox-outline" : "square-outline"}
                size={24}
                color={selectedCourses[course.id] ? "#2196F3" : "#888"}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noCoursesText}>Seçilen yıl ve dönem için ders bulunmamaktadır.</Text>
        )}
      </ScrollView>

      {coursesToDisplay.length > 0 && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitSelection}>
            <Text style={styles.submitButtonText}>Seçimleri Kaydet ve Onaya Gönder</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: 'space-between',
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
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
    // On Android, Picker can have a native border/background.
    // On iOS, you might need to style the Picker's parent View.
    ...(Platform.OS === 'android' && {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    })
  },
  pickerLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: Platform.OS === 'ios' ? -10 : 0, // Adjust for iOS picker label overlap
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : 'transparent', // Ensure label is above picker
    zIndex: Platform.OS === 'ios' ? 1: 0,
  },
  picker: {
    height: Platform.OS === 'ios' ? 120 : 50, // iOS needs more height for the wheel
    width: '100%',
    // backgroundColor: '#f9f9f9', // Can cause issues on iOS picker display
  },
  pickerItem: { // Specifically for iOS item styling
    height: 120,
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  courseItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
  },
  courseItemSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  courseInfo: {
    flex: 1,
    marginRight: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  noCoursesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 50,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseSelectionScreen;