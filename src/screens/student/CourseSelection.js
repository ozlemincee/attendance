import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Surface, Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CourseSelection = ({ navigation }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Örnek ders verisi
  useEffect(() => {
    // Burada gerçek bir API çağrısı yapılacak
    const fetchCourses = async () => {
      // Simüle edilmiş API yanıtı
      const mockCourses = [
        {
          id: 'CS101',
          name: 'Programlama Temelleri',
          instructor: 'Dr. Ahmet Yıldız',
          schedule: 'Pazartesi 10:00-12:00',
          capacity: 45,
          enrolled: 30,
          required: true,
        },
        {
          id: 'CS202',
          name: 'Veri Yapıları',
          instructor: 'Dr. Mehmet Kaya',
          schedule: 'Salı 13:00-15:00',
          capacity: 40,
          enrolled: 35,
          required: true,
        },
        {
          id: 'MATH101',
          name: 'Matematik I',
          instructor: 'Dr. Ali Öztürk',
          schedule: 'Çarşamba 09:00-11:00',
          capacity: 50,
          enrolled: 45,
          required: true,
        },
        {
          id: 'PHY101',
          name: 'Fizik I',
          instructor: 'Dr. Zeynep Demir',
          schedule: 'Perşembe 14:00-16:00',
          capacity: 40,
          enrolled: 25,
          required: true,
        },
        {
          id: 'ENG101',
          name: 'İngilizce I',
          instructor: 'Dr. John Smith',
          schedule: 'Cuma 10:00-12:00',
          capacity: 30,
          enrolled: 20,
          required: false,
        },
      ];

      setCourses(mockCourses);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      Alert.alert('Hata', 'Lütfen en az bir ders seçiniz.');
      return;
    }

    // Burada gerçek bir API çağrısı yapılacak
    // submitCourseSelection(selectedCourses);
    
    Alert.alert(
      'Başarılı',
      'Ders seçiminiz kaydedildi. Derslerin onaylanması için akademisyenlerin onayı bekleniyor.',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('StudentProfile')
        }
      ]
    );
  };

  const renderCourseCard = (course) => {
    const isSelected = selectedCourses.includes(course.id);
    const isFull = course.enrolled >= course.capacity;

    return (
      <Surface key={course.id} style={styles.courseCard}>
        <View style={styles.courseHeader}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseCode}>{course.id}</Text>
            <Text style={styles.courseName}>{course.name}</Text>
          </View>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => !isFull && toggleCourseSelection(course.id)}
            disabled={isFull}
            color="#2196F3"
          />
        </View>

        <View style={styles.courseDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{course.instructor}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{course.schedule}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {course.enrolled}/{course.capacity} Öğrenci
            </Text>
          </View>
        </View>

        {course.required && (
          <View style={styles.requiredBadge}>
            <Text style={styles.requiredText}>Zorunlu Ders</Text>
          </View>
        )}

        {isFull && (
          <View style={styles.fullBadge}>
            <Text style={styles.fullText}>Kontenjan Dolu</Text>
          </View>
        )}
      </Surface>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ders Seçimi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Surface style={styles.infoCard}>
          <Text style={styles.infoTitle}>Ders Seçim Kuralları</Text>
          <Text style={styles.infoText}>
            • Zorunlu derslerinizi seçmeyi unutmayınız.{'\n'}
            • Ders seçimleriniz akademisyenler tarafından onaylanacaktır.{'\n'}
            • Kontenjanı dolu olan dersleri seçemezsiniz.{'\n'}
            • Ders çakışması olmamasına dikkat ediniz.
          </Text>
        </Surface>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Dersler yükleniyor...</Text>
          </View>
        ) : (
          <View style={styles.coursesContainer}>
            {courses.map(course => renderCourseCard(course))}
          </View>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Ders Seçimini Tamamla</Text>
        </TouchableOpacity>
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
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  coursesContainer: {
    marginBottom: 20,
  },
  courseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
    fontWeight: '500',
    color: '#333',
  },
  courseDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  requiredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  fullBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fullText: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CourseSelection; 