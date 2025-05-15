// MyCourses.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, SafeAreaView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Surface } from 'react-native-paper';
import { allCoursesData } from '../../data/courses'; // Adjust path if necessary

const MyCoursesScreen = ({ route, navigation }) => {
  const { academicianId, currentCourses } = route.params;
  const [managedCourses, setManagedCourses] = useState([]);
  const [isAddCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const [availableCoursesForSelection, setAvailableCoursesForSelection] = useState([]);
  const [tempSelectedCourses, setTempSelectedCourses] = useState({}); // For modal selection: { courseId: true }

  useEffect(() => {
    // Initialize managedCourses with a deep copy to avoid direct mutation issues
    setManagedCourses(JSON.parse(JSON.stringify(currentCourses || [])));
  }, [currentCourses]);

  const prepareAvailableCourses = () => {
    const academicianCourseIds = new Set(managedCourses.map(c => c.id));
    const allDeptCourses = [];
    Object.values(allCoursesData).forEach(year => {
      Object.values(year).forEach(semesterCourses => {
        semesterCourses.forEach(course => {
          if (!academicianCourseIds.has(course.id)) { // Only show courses not already taught by academician
            // Check for duplicates by ID before adding
            if (!allDeptCourses.some(existingCourse => existingCourse.id === course.id)) {
                 allDeptCourses.push(course);
            }
          }
        });
      });
    });
    setAvailableCoursesForSelection(allDeptCourses);
  };

  const handleOpenAddCourseModal = () => {
    prepareAvailableCourses();
    setTempSelectedCourses({}); // Reset temporary selections
    setAddCourseModalVisible(true);
  };

  const toggleTempCourseSelection = (courseId) => {
    setTempSelectedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleAddSelectedCourses = () => {
    const coursesToAdd = availableCoursesForSelection.filter(course => tempSelectedCourses[course.id]);
    if (coursesToAdd.length === 0) {
      Alert.alert("Uyarı", "Lütfen eklenecek dersleri seçin.");
      return;
    }
    // Add new properties expected by AcademicianProfile course items if needed
    const newCoursesFormatted = coursesToAdd.map(course => ({
        id: course.id,
        name: course.name,
        students: 0, // Default student count
        time: 'Belirlenecek' // Default time
    }));

    setManagedCourses(prev => [...prev, ...newCoursesFormatted]);
    setAddCourseModalVisible(false);
  };

  const handleSaveChangesAndGoBack = () => {
    navigation.navigate('AcademicianProfile', { updatedCourses: managedCourses });
  };

  const renderCourseItem = ({ item }) => (
    <Surface style={styles.courseCard}>
      <View style={styles.courseInfoContent}>
        <Text style={styles.courseCodeText}>{item.id}</Text>
        <Text style={styles.courseNameText}>{item.name}</Text>
        <Text style={styles.courseDetailText}>{item.time || 'Zaman Belirlenmedi'}</Text>
      </View>
      <View style={styles.studentInfoContainer}>
        <Text style={styles.studentLabelText}>Öğrenci</Text>
        <View style={styles.studentBadgeView}>
          <Text style={styles.studentValueText}>{item.students || 0}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('CourseDetails', { courseId: item.id, courseName: item.name, academicianId })}
      >
        <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </Surface>
  );

  const renderSelectableCourseItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.selectableCourseItem,
        tempSelectedCourses[item.id] && styles.selectableCourseItemSelected
      ]}
      onPress={() => toggleTempCourseSelection(item.id)}
    >
      <View style={{flex: 1}}>
        <Text style={styles.selectableCourseName}>{item.name} ({item.id})</Text>
        <Text style={styles.selectableCourseDetails}>Kredi: {item.credits}, AKTS: {item.ects}, Tip: {item.type}</Text>
      </View>
      <Ionicons
        name={tempSelectedCourses[item.id] ? "checkbox-outline" : "square-outline"}
        size={24}
        color={tempSelectedCourses[item.id] ? "#007bff" : "#888"}
      />
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      
      <TouchableOpacity style={styles.addCourseButton} onPress={handleOpenAddCourseModal}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addCourseButtonText}>Yeni Ders Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={managedCourses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyListText}>Henüz yönetilecek dersiniz bulunmuyor.</Text>}
      />
      
      <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChangesAndGoBack}>
        <Text style={styles.saveChangesButtonText}>Değişiklikleri Kaydet ve Geri Dön</Text>
      </TouchableOpacity>

      {/* Add Course Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddCourseModalVisible}
        onRequestClose={() => setAddCourseModalVisible(false)}
      >
        <View style={styles.modalOverlayView}>
          <View style={styles.modalContentView}>
            <Text style={styles.modalTitleText}>Ders Ekle</Text>
            {availableCoursesForSelection.length > 0 ? (
                <FlatList
                    data={availableCoursesForSelection}
                    renderItem={renderSelectableCourseItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{paddingBottom: 20}}
                />
            ) : (
                <Text style={styles.noCoursesModalText}>Eklenecek uygun ders bulunamadı veya tüm dersler zaten listenizde.</Text>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalCancelButton]}
                onPress={() => setAddCourseModalVisible(false)}
              >
                <Text style={styles.modalActionButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalConfirmButton]}
                onPress={handleAddSelectedCourses}
              >
                <Text style={[styles.modalActionButtonText, {color: '#fff'}]}>Seçilenleri Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerBackButton: {
    padding: 5,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addCourseButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Green
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    elevation: 2,
  },
  addCourseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  courseInfoContent: {
    flex: 1,
  },
  courseCodeText: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 3,
  },
  courseNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  courseDetailText: {
    fontSize: 14,
    color: '#666',
  },
  studentInfoContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  studentLabelText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3,
  },
  studentBadgeView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
  },
  studentValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  detailsButton: {
    padding: 8,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
  saveChangesButton: {
    backgroundColor: '#007bff', // Blue
    paddingVertical: 15,
    marginHorizontal: 16,
    marginBottom: 10, // Space from bottom
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  saveChangesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlayView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContentView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  selectableCourseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal:10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectableCourseItemSelected: {
    backgroundColor: '#e6f2ff', // Light blue for selected
  },
  selectableCourseName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  selectableCourseDetails: {
      fontSize: 12,
      color: '#666',
      marginTop: 3,
  },
  noCoursesModalText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 15,
    color: '#777',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalCancelButton: {
    backgroundColor: '#6c757d', // Gray
  },
  modalConfirmButton: {
    backgroundColor: '#007bff', // Blue
  },
  modalActionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MyCoursesScreen;