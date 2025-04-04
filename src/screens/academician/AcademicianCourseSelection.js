import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

export default function AcademicianCourseSelection({ route, navigation }) {
  const { academicInfo, selectedCourses, setSelectedCourses } = route.params;
  const [courses, setCourses] = useState([
    { id: 1, name: 'Matematik', selected: false },
    { id: 2, name: 'Fizik', selected: false },
    { id: 3, name: 'Bilgisayar Programlama', selected: false },
    { id: 4, name: 'Elektronik', selected: false },
  ]);

  const handleCourseToggle = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, selected: !course.selected } : course
    ));
  };

  const handleSubmit = () => {
    const selectedCourseNames = courses.filter(course => course.selected).map(course => course.name);
    setSelectedCourses(selectedCourseNames);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ders Seçimi</Text>
      {courses.map(course => (
        <View key={course.id} style={styles.courseItem}>
          <Checkbox
            status={course.selected ? 'checked' : 'unchecked'}
            onPress={() => handleCourseToggle(course.id)}
          />
          <Text style={styles.courseName}>{course.name}</Text>
        </View>
      ))}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Seçimleri Kaydet
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  courseName: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
  },
}); 