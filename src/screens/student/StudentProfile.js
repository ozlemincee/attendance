import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StudentProfile = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [studentInfo, setStudentInfo] = useState({
    id: studentId,
    name: 'Özlem İnce',
    department: 'Bilgisayar Mühendisliği',
    year: 3,
    photo: null,
    courses: [
      { id: 'CS101', name: 'Programlama Temelleri', attendance: '85%' },
      { id: 'CS202', name: 'Veri Yapıları', attendance: '70%' },
      { id: 'CS303', name: 'Veritabanı Sistemleri', attendance: '90%' },
      { id: 'MATH101', name: 'Matematik I', attendance: '75%' },
    ],
    email: 'ozlemince@example.com',
    address: 'İstanbul, Türkiye',
    phone: '555-123-4567',
    password: '123'
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState(studentInfo.address);
  const [editedPhone, setEditedPhone] = useState(studentInfo.phone);
  const [editedPassword, setEditedPassword] = useState(studentInfo.password);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    console.log('Öğrenci bilgileri yüklendi:', studentId);
  }, [studentId]);

  const handleSaveChanges = () => {
    if (editedPassword !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    if (editedPassword.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setStudentInfo({
      ...studentInfo,
      address: editedAddress,
      phone: editedPhone,
      password: editedPassword
    });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('StudentSettings')}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Surface style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profilePhotoContainer}>
                {studentInfo.photo ? (
                  <Image source={{ uri: studentInfo.photo }} style={styles.profilePhoto} />
                ) : (
                  <View style={styles.profilePhotoPlaceholder}>
                    <Ionicons name="person" size={40} color="#757575" />
                  </View>
                )}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{studentInfo.name}</Text>
                <Text style={styles.profileDetail}>{studentInfo.department}</Text>
                <Text style={styles.profileDetail}>Öğrenci No: {studentInfo.id}</Text>
              </View>
            </View>
          </Surface>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { flex: 1 }]}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <Text style={styles.modalTitle}>Kişisel Bilgiler</Text>

                <Text style={styles.modalLabel}>Ad Soyad:</Text>
                <Text style={styles.modalInfo}>{studentInfo.name}</Text>

                <Text style={styles.modalLabel}>Öğrenci No:</Text>
                <Text style={styles.modalInfo}>{studentInfo.id}</Text>

                <Text style={styles.modalLabel}>E-posta:</Text>
                <Text style={styles.modalInfo}>{studentInfo.email}</Text>

                <Text style={styles.modalLabel}>Adres:</Text>
                <TextInput style={styles.modalInput} value={editedAddress} onChangeText={setEditedAddress} />

                <Text style={styles.modalLabel}>Telefon:</Text>
                <TextInput style={styles.modalInput} value={editedPhone} onChangeText={setEditedPhone} />

                <Text style={styles.modalLabel}>Şifre:</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.modalInput, { width: '80%' }]}
                    value={editedPassword}
                    onChangeText={setEditedPassword}
                    secureTextEntry={!showStudentPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowStudentPassword(!showStudentPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showStudentPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalLabel}>Şifreyi Doğrula:</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.modalInput, { width: '80%' }]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showStudentPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowStudentPassword(!showStudentPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showStudentPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Kapat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#2196F3' }]} onPress={handleSaveChanges}>
                    <Text style={[styles.modalButtonText, { color: 'white' }]}>Kaydet</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={styles.sectionHeader}>
          <Ionicons name="book-outline" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Derslerim</Text>
        </View>

        {studentInfo.courses.map((course) => (
          <Surface key={course.id} style={styles.courseCard}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseCode}>{course.id}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
            </View>
            <View style={styles.attendanceContainer}>
              <Text style={styles.attendanceLabel}>Devam</Text>
              <View style={styles.attendanceBadge}>
                <Text style={styles.attendanceValue}>{course.attendance}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.courseButton}
              onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
            >
              <Ionicons name="chevron-forward" size={24} color="#2196F3" />
            </TouchableOpacity>
          </Surface>
        ))}

        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Attendance')}
          >
            <Ionicons name="checkbox-outline" size={32} color="#4CAF50" style={styles.actionIcon} />
            <Text style={styles.actionText}>Yoklama Durumu</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Ionicons name="time-outline" size={32} color="#FFC107" style={styles.actionIcon} />
            <Text style={styles.actionText}>Ders Programı</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Performance')}
          >
            <Ionicons name="stats-chart-outline" size={32} color="#9C27B0" style={styles.actionIcon} />
            <Text style={styles.actionText}>Performans</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    profileCard: {
      elevation: 4,
      borderRadius: 12,
      padding: 16,
      backgroundColor: 'white',
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePhotoContainer: {
      marginRight: 16,
    },
    profilePhoto: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    profilePhotoPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    profileDetail: {
      fontSize: 16,
      color: '#757575',
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
  settingsButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  profileCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhotoContainer: {
    marginRight: 16,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profilePhotoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 1,
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
  attendanceContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  attendanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  attendanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  attendanceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
  },
  courseButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    elevation: 1,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    color: '#666',
  },
 

  
  modalButtonText: {
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto', // Butonları en alta yasla
    paddingVertical: 20,
  },
});

export default StudentProfile;
