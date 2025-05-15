import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal, TextInput, Alert } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import AuthPage from '../auth/AuthPage';

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
    ],
    email: 'ahmet.yildiz@example.com',
    address: 'İstanbul, Türkiye',
    phone: '555-123-4567',
    password: 'securePassword'
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [showAcademicianPassword, setShowAcademicianPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setEditedAddress(academicianInfo.address);
    setEditedPhone(academicianInfo.phone);
    setEditedPassword(''); 
    setConfirmPassword('');
  }, [modalVisible, academicianInfo.address, academicianInfo.phone]);

  useEffect(() => {
    if (route.params?.updatedCourses) {
      setAcademicianInfo(prevInfo => ({
        ...prevInfo,
        courses: route.params.updatedCourses,
      }));
      navigation.setParams({ updatedCourses: undefined }); 
    }
  }, [route.params?.updatedCourses, navigation]);
  
  useEffect(() => {
    console.log('Akademisyen bilgileri yüklendi:', academicianId);
    setEditedAddress(academicianInfo.address);
    setEditedPhone(academicianInfo.phone);
  }, [academicianId, academicianInfo.address, academicianInfo.phone]); // Added dependencies

  const handleOpenModal = () => {
    setEditedAddress(academicianInfo.address);
    setEditedPhone(academicianInfo.phone);
    setEditedPassword('');
    setConfirmPassword('');
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    let passwordToSave = academicianInfo.password; 

    if (editedPassword.length > 0) { 
      if (editedPassword.length < 6) {
        Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
        return;
      }
      if (editedPassword !== confirmPassword) {
        Alert.alert('Hata', 'Yeni girilen şifreler eşleşmiyor.');
        return;
      }
      passwordToSave = editedPassword; 
    }

    setAcademicianInfo({
      ...academicianInfo,
      address: editedAddress,
      phone: editedPhone,
      password: passwordToSave
    });
    setModalVisible(false);
    Alert.alert('Başarılı', 'Bilgileriniz güncellendi.');
  };

  // Logout Handler
  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Evet", 
          onPress: () => {
            // 1. Clear any authentication state (e.g., asyncStorage, context)
            // Example: await AsyncStorage.removeItem('userToken');
            // Example: authContext.signOut();

            // 2. Reset navigation stack and navigate to Login/Auth screen
            // Replace 'Login' with your actual authentication screen name
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }], // Or 'Auth', 'AuthPage' etc.
              })
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* The local header in AcademicianProfile.js */}
      <View style={styles.header}>
        <TouchableOpacity 
        style={{ padding: 8 }} 
        onPress={handleLogout} // Use the new logout handler
      > 
        {/* Changed icon to a more common 'exit' or 'logout' icon */}
        <Ionicons name="log-out-outline" size={26} color="#D32F2F" />   
        </TouchableOpacity>
        <View style={{ width: 40 }} />
      
        <TouchableOpacity
          style={{ padding: 8 }} // Örnek: Dokunma alanını kolaylaştırmak için padding ekledik
          onPress={() => navigation.navigate('AcademicSettings')} // Ayarlar ekranına yönlendir
        >
          <Ionicons name="settings-outline" size={26} color="#333" /> {/* Ayarlar ikonu */}
        </TouchableOpacity>

      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Surface style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profilePhotoContainer}>
                {academicianInfo.photo ? (
                  <Image source={{ uri: academicianInfo.photo }} style={styles.profilePhoto} />
                ) : (
                  <View style={styles.profilePhotoPlaceholder}>
                    <Ionicons name="person-circle-outline" size={60} color="#757575" />
                  </View>
                )}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{academicianInfo.name}</Text>
                <Text style={styles.profileDetail}>{academicianInfo.title}</Text>
                <Text style={styles.profileDetail}>{academicianInfo.department}</Text>
                <Text style={styles.profileDetail}>Sicil No: {academicianInfo.id}</Text>
              </View>
              <Ionicons name="pencil-outline" size={20} color="#666" />
            </View>
          </Surface>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContentContainer}>
            <ScrollView>
                <View style={styles.modalInnerContent}>
                    <Text style={styles.modalTitle}>Kişisel Bilgileri Düzenle</Text>

                    <Text style={styles.modalLabel}>Ad Soyad:</Text>
                    <Text style={styles.modalInfo}>{academicianInfo.name}</Text>

                    <Text style={styles.modalLabel}>Sicil No:</Text>
                    <Text style={styles.modalInfo}>{academicianInfo.id}</Text>

                    <Text style={styles.modalLabel}>E-posta:</Text>
                    <Text style={styles.modalInfo}>{academicianInfo.email}</Text>

                    <Text style={styles.modalLabel}>Adres:</Text>
                    <TextInput style={styles.modalInput} value={editedAddress} onChangeText={setEditedAddress} placeholder="Adres" />

                    <Text style={styles.modalLabel}>Telefon:</Text>
                    <TextInput style={styles.modalInput} value={editedPhone} onChangeText={setEditedPhone} placeholder="Telefon" keyboardType="phone-pad"/>

                    <Text style={styles.modalLabel}>Yeni Şifre (isteğe bağlı, min 6 karakter):</Text>
                    <View style={styles.passwordInputContainerModal}>
                        <TextInput
                        style={styles.modalInputPassword}
                        value={editedPassword}
                        onChangeText={setEditedPassword}
                        secureTextEntry={!showAcademicianPassword}
                        placeholder="Değiştirmek istemiyorsanız boş bırakın"
                        />
                        <TouchableOpacity onPress={() => setShowAcademicianPassword(!showAcademicianPassword)} style={styles.eyeIconModal}>
                        <Ionicons name={showAcademicianPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#666"/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.modalLabel}>Yeni Şifreyi Doğrula:</Text>
                    <View style={styles.passwordInputContainerModal}>
                        <TextInput
                        style={styles.modalInputPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showAcademicianPassword}
                        placeholder="Yeni şifreyi tekrar girin"
                        />
                        <TouchableOpacity onPress={() => setShowAcademicianPassword(!showAcademicianPassword)} style={styles.eyeIconModal}>
                        <Ionicons name={showAcademicianPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#666"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Kapat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveChanges}>
                        <Text style={[styles.modalButtonText, styles.saveButtonText]}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </View>
        </View>
        </Modal>
        
        <View style={styles.sectionHeader}>
          <Ionicons name="book-outline" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Verilen Dersler</Text>
        </View>

        <TouchableOpacity 
            style={styles.manageCoursesButton}
            onPress={() => navigation.navigate('MyCourses', { 
                            academicianId: academicianInfo.id, 
                            currentCourses: academicianInfo.courses 
                        })}
        >
            <Ionicons name="create-outline" size={20} color="#fff" style={{marginRight: 8}}/>
            <Text style={styles.manageCoursesButtonText}>Dersleri Yönet / Yeni Ders Ekle</Text>
        </TouchableOpacity>

        {academicianInfo.courses.length > 0 ? academicianInfo.courses.map((course) => (
          <Surface key={course.id} style={styles.courseCard}>
            <View style={styles.courseInfoSection}>
              <Text style={styles.courseCode}>{course.id}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDetail}>{course.time || 'Zaman Belirtilmemiş'}</Text>
            </View>
            <View style={styles.studentContainer}>
              <Text style={styles.studentLabel}>Öğrenci</Text>
              <View style={styles.studentBadge}>
                <Text style={styles.studentValue}>{course.students || 0}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.courseButton}
              onPress={() => navigation.navigate('CourseDetails', { courseId: course.id, courseName: course.name, academicianId: academicianInfo.id })}
            >
              <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </Surface>
        )) : (
            <Text style={styles.noCoursesText}>Henüz atanmış dersiniz bulunmamaktadır.</Text>
        )}

        <View style={styles.sectionHeader}>
          <Ionicons name="apps-outline" size={24} color="#2196F3" />
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
    justifyContent: 'space-between', // Ensures title is centered if back button takes space
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exitButton: { // Renamed from backButton
    padding: 8, // Make sure it's easy to tap
    marginRight: 10, // Add some margin if needed
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
    // textAlign: 'center', // If you want to ensure it's centered regardless of buttons
    // flex: 1, // Allow title to take available space if centering
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  profileCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhotoContainer: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 45, 
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  manageCoursesButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  manageCoursesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  courseInfoSection: { 
    flex: 1,
  },
  courseCode: {
    fontSize: 13,
    color: '#757575',
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
    marginHorizontal: 12,
  },
  studentLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  studentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#E8F5E9', 
  },
  studentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50', 
  },
  courseButton: { 
    padding: 8,
  },
  noCoursesText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 15,
    color: '#777',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1, 
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6, 
    elevation: 2,
    minHeight: 100,
    justifyContent: 'center', 
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContentContainer: { 
    width: '90%',
    maxHeight: '85%', 
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 20, 
    elevation: 5,
  },
  modalInnerContent: { 
    paddingHorizontal: 20, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 12,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  passwordInputContainerModal: { 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  modalInputPassword: { 
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 0, 
  },
  eyeIconModal: { 
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10, 
  },
  modalButton: {
    flex: 1, 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5, 
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
  },
  saveButtonText: {
    color: 'white', 
  },
});

export default AcademicianProfile;
