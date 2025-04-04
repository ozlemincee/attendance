import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Image, FlatList } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Geçici çözüm - kamera kullanımı
const CameraPlaceholder = ({ children, style }) => {
  return (
    <View style={[style, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
      {children}
    </View>
  );
};

const TakeAttendance = ({ navigation }) => {
  const [courses, setCourses] = useState([
    { id: 'CS101', name: 'Programlama Temelleri', time: 'Pazartesi 10:00', students: 45 },
    { id: 'CS202', name: 'Veri Yapıları', time: 'Salı 13:00', students: 38 },
    { id: 'CS303', name: 'Veritabanı Sistemleri', time: 'Çarşamba 15:00', students: 42 },
    { id: 'CS404', name: 'İleri Programlama', time: 'Perşembe 09:00', students: 25 },
  ]);
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Örnek öğrenci verisi
  const students = [
    { id: '1001', name: 'Ali Yılmaz', photoUrl: null, present: false },
    { id: '1002', name: 'Ayşe Kaya', photoUrl: null, present: false },
    { id: '1003', name: 'Mehmet Demir', photoUrl: null, present: false },
    { id: '1004', name: 'Zeynep Şahin', photoUrl: null, present: false },
    { id: '1005', name: 'Emre Kılıç', photoUrl: null, present: false },
    { id: '1006', name: 'Deniz Yıldız', photoUrl: null, present: false },
  ];

  const takePicture = async () => {
    if (!isProcessing) {
      setIsProcessing(true);
      try {
        // Simüle edilmiş yüz tanıma
        setTimeout(() => {
          simulateFaceRecognition();
          setIsProcessing(false);
        }, 1500);
      } catch (error) {
        console.error('Fotoğraf çekerken hata oluştu:', error);
        setIsProcessing(false);
      }
    }
  };

  // Yüz tanımayı simüle eden fonksiyon
  const simulateFaceRecognition = () => {
    // Tanınmamış öğrencilerden rastgele 1-3 öğrenci seç
    const unrecognizedStudents = students.filter(
      student => !recognizedStudents.some(s => s.id === student.id)
    );
    
    if (unrecognizedStudents.length > 0) {
      const recognitionCount = Math.min(
        Math.floor(Math.random() * 3) + 1,
        unrecognizedStudents.length
      );
      
      const newlyRecognized = [];
      
      for (let i = 0; i < recognitionCount; i++) {
        const randomIndex = Math.floor(Math.random() * unrecognizedStudents.length);
        const recognizedStudent = unrecognizedStudents[randomIndex];
        
        newlyRecognized.push({
          ...recognizedStudent, 
          present: true,
          timestamp: new Date().toLocaleTimeString()
        });
        
        // Seçilen öğrenciyi listeden kaldır
        unrecognizedStudents.splice(randomIndex, 1);
      }
      
      // Tanınan öğrencileri listeye ekle
      setRecognizedStudents(prev => [...prev, ...newlyRecognized]);
    }
  };

  const startAttendance = (course) => {
    setSelectedCourse(course);
    setRecognizedStudents([]);
    setShowCamera(true);
  };

  const finishAttendance = () => {
    setShowCamera(false);
    // Burada yoklama sonuçları kaydedilebilir
    if (recognizedStudents.length > 0) {
      // Gerçek uygulamada: API'ye yoklama verilerini gönder
      alert(`${selectedCourse.name} dersi için ${recognizedStudents.length} öğrencinin yoklaması alındı.`);
    }
  };

  const renderCourseItem = (course) => (
    <Surface key={course.id} style={styles.courseCard}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseCode}>{course.id}</Text>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.courseTime}>{course.time}</Text>
      </View>
      <TouchableOpacity
        style={styles.attendanceButton}
        onPress={() => startAttendance(course)}
      >
        <Ionicons name="camera-outline" size={20} color="#fff" />
        <Text style={styles.attendanceButtonText}>Yoklama Al</Text>
      </TouchableOpacity>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Bugünkü Dersleriniz</Text>
        
        {courses.map(course => renderCourseItem(course))}
      </ScrollView>

      {/* Kamera Modali */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={() => setShowCamera(false)}
      >
        <SafeAreaView style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>
              {selectedCourse ? selectedCourse.name : ''} - Yoklama
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={finishAttendance}
            >
              <Text style={styles.doneButtonText}>Bitir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cameraPreview}>
            <CameraPlaceholder style={styles.camera}>
              <View style={styles.overlay}>
                <View style={styles.faceFrame} />
              </View>
            </CameraPlaceholder>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]}
              onPress={takePicture}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Text style={styles.processingText}>İşleniyor...</Text>
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.recognizedStudentsContainer}>
            <Text style={styles.recognizedStudentsTitle}>
              Tanınan Öğrenciler ({recognizedStudents.length})
            </Text>
            {recognizedStudents.length > 0 ? (
              <FlatList
                data={recognizedStudents}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.studentItem}>
                    <View style={styles.studentPhoto}>
                      <Ionicons name="person" size={24} color="#757575" />
                    </View>
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{item.name}</Text>
                      <Text style={styles.studentId}>{item.id}</Text>
                    </View>
                    <Text style={styles.studentTimestamp}>{item.timestamp}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noStudentsText}>Henüz öğrenci tanınmadı</Text>
            )}
          </View>
        </SafeAreaView>
      </Modal>
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
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseTime: {
    fontSize: 14,
    color: '#666',
  },
  attendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  attendanceButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  closeButton: {
    padding: 8,
  },
  cameraTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  cameraPreview: {
    flex: 2,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceFrame: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  controls: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: '#757575',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
  processingText: {
    color: '#000',
    fontSize: 12,
  },
  recognizedStudentsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  recognizedStudentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  studentPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  studentId: {
    fontSize: 14,
    color: '#666',
  },
  studentTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  noStudentsText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default TakeAttendance; 