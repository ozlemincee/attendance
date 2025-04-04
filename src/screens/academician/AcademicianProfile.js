import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AcademicianProfile = ({ route, navigation }) => {
  const { academicianId } = route.params;
  const [academicianInfo, setAcademicianInfo] = useState({
    id: academicianId,
    name: 'Dr. Ahmet Yıldız',
    department: 'Bilgisayar Mühendisliği',
    title: 'Doç. Dr.',
    photo: null,
    courses: [
      { id: 'CS101', name: 'Programlama Temelleri', students: 45, time: 'Pazartesi 10:00' },
      { id: 'CS202', name: 'Veri Yapıları', students: 38, time: 'Salı 13:00' },
      { id: 'CS303', name: 'Veritabanı Sistemleri', students: 42, time: 'Çarşamba 15:00' },
      { id: 'CS404', name: 'İleri Programlama', students: 25, time: 'Perşembe 09:00' },
    ],
    email: 'ahmet.yildiz@example.com',
    address: 'İstanbul, Türkiye',
    phone: '555-123-4567',
    password: 'securePassword'
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState(academicianInfo.address);
  const [editedPhone, setEditedPhone] = useState(academicianInfo.phone);
  const [editedPassword, setEditedPassword] = useState(academicianInfo.password);
  const [showAcademicianPassword, setShowAcademicianPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  
  useEffect(() => {
    console.log('Akademisyen bilgileri yüklendi:', academicianId);
  }, [academicianId]);

  const handleSaveChanges = () => {
    if (editedPassword !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    if (editedPassword.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }
    setAcademicianInfo({
      ...academicianInfo,
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
          onPress={() => navigation.navigate('AcademicSettings')}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Surface style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profilePhotoContainer}>
                {academicianInfo.photo ? (
                  <Image source={{ uri: academicianInfo.photo }} style={styles.profilePhoto} />
                ) : (
                  <View style={styles.profilePhotoPlaceholder}>
                    <Ionicons name="person" size={40} color="#757575" />
                  </View>
                )}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{academicianInfo.name}</Text>
                <Text style={styles.profileDetail}>{academicianInfo.title}</Text>
                <Text style={styles.profileDetail}>{academicianInfo.department}</Text>
                <Text style={styles.profileDetail}>Sicil No: {academicianInfo.id}</Text>
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
              <Text style={styles.modalInfo}>{academicianInfo.name}</Text>

              <Text style={styles.modalLabel}>Sicil No:</Text>
              <Text style={styles.modalInfo}>{academicianInfo.id}</Text>

              <Text style={styles.modalLabel}>E-posta:</Text>
              <Text style={styles.modalInfo}>{academicianInfo.email}</Text>

              <Text style={styles.modalLabel}>Adres:</Text>
              <TextInput style={styles.modalInput} value={editedAddress} onChangeText={setEditedAddress} />

              <Text style={styles.modalLabel}>Telefon:</Text>
              <TextInput style={styles.modalInput} value={editedPhone} onChangeText={setEditedPhone} />

              <Text style={styles.modalLabel}>Şifre:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.modalInput, { width: '80%' }]} // Sabit genişlik
                  value={editedPassword}
                  onChangeText={setEditedPassword}
                  secureTextEntry={!showAcademicianPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowAcademicianPassword(!showAcademicianPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showAcademicianPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Şifreyi Doğrula:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.modalInput, { width: '80%' }]} // Sabit genişlik
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showAcademicianPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowAcademicianPassword(!showAcademicianPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showAcademicianPassword ? 'eye-off-outline' : 'eye-outline'}
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
          <Ionicons name="book-outline" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Verilen Dersler</Text>
        </View>

        {academicianInfo.courses.map((course) => (
          <Surface key={course.id} style={styles.courseCard}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseCode}>{course.id}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDetail}>{course.time}</Text>
            </View>
            <View style={styles.studentContainer}>
              <Text style={styles.studentLabel}>Öğrenci</Text>
              <View style={styles.studentBadge}>
                <Text style={styles.studentValue}>{course.students}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.courseButton}
              onPress={() => navigation.navigate('CourseDetails', { courseName: course.name })}
            >
              <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </Surface>
        ))}

        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('TakeAttendance')}
          >
            <Ionicons name="camera-outline" size={32} color="#4CAF50" style={styles.actionIcon} />
            <Text style={styles.actionText}>Yoklama Al</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('StudentList')}
          >
            <Ionicons name="people-outline" size={32} color="#2196F3" style={styles.actionIcon} />
            <Text style={styles.actionText}>Öğrenciler</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reports')}
          >
            <Ionicons name="analytics-outline" size={32} color="#FFC107" style={styles.actionIcon} />
            <Text style={styles.actionText}>Raporlar</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 4,
  },
  courseDetail: {
    fontSize: 14,
    color: '#666',
  },
  studentContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  studentLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  studentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },
  studentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
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

export default AcademicianProfile;
