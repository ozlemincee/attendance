import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal, TextInput } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

const StudentProfile = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [studentInfo, setStudentInfo] = useState({
    id: studentId,
    name: 'Özlem İnce',
    department: 'Bilgisayar Mühendisliği',
    year: 3, // Current year of the student
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
    if (modalVisible) {
      setEditedAddress(studentInfo.address);
      setEditedPhone(studentInfo.phone);
      setEditedPassword(studentInfo.password); // Keep current password in field
      setConfirmPassword('');
    }
  }, [modalVisible, studentInfo]);

  useEffect(() => {
    console.log('Öğrenci bilgileri yüklendi:', studentId);
  }, [studentId]);

  const handleSaveChanges = () => {
    let passwordToSave = studentInfo.password; // Default to old password

    if (editedPassword.length > 0) { // If user typed something in new password field
        if (editedPassword.length < 6) {
            Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
            return;
        }
        if (editedPassword !== confirmPassword) {
            Alert.alert('Hata', 'Yeni girilen şifreler eşleşmiyor.');
            return;
        }
        passwordToSave = editedPassword; // Update to new password
    }
    // If editedPassword is empty, passwordToSave remains studentInfo.password (no change)

    setStudentInfo({
      ...studentInfo,
      address: editedAddress,
      phone: editedPhone,
      password: passwordToSave
    });
    setModalVisible(false);
    Alert.alert('Başarılı', 'Bilgileriniz güncellendi.');
  };
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
          
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
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
                onPress={() => navigation.navigate('StudentSettings')} // Ayarlar ekranına yönlendir
              >
                <Ionicons name="settings-outline" size={26} color="#333" /> {/* Ayarlar ikonu */}
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
                <Text style={styles.profileDetail}>Sınıf: {studentInfo.year}. Sınıf</Text>
                <Text style={styles.profileDetail}>Öğrenci No: {studentInfo.id}</Text>
              </View>
              <Ionicons name="pencil-outline" size={20} color="#666" />
            </View>
          </Surface>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <ScrollView contentContainerStyle={styles.modalScrollContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Kişisel Bilgileri Düzenle</Text>
                    <Text style={styles.modalLabel}>Ad Soyad:</Text>
                    <Text style={styles.modalInfo}>{studentInfo.name}</Text>
                    <Text style={styles.modalLabel}>Öğrenci No:</Text>
                    <Text style={styles.modalInfo}>{studentInfo.id}</Text>
                    <Text style={styles.modalLabel}>E-posta:</Text>
                    <Text style={styles.modalInfo}>{studentInfo.email}</Text>
                    <Text style={styles.modalLabel}>Adres:</Text>
                    <TextInput style={styles.modalInput} value={editedAddress} onChangeText={setEditedAddress} placeholder="Adresinizi girin"/>
                    <Text style={styles.modalLabel}>Telefon:</Text>
                    <TextInput style={styles.modalInput} value={editedPhone} onChangeText={setEditedPhone} placeholder="Telefon numaranızı girin" keyboardType="phone-pad"/>
                    <Text style={styles.modalLabel}>Yeni Şifre (isteğe bağlı, min 6 karakter):</Text>
                    <View style={styles.passwordContainerModal}>
                    <TextInput style={styles.modalInputPassword} value={editedPassword} onChangeText={setEditedPassword} secureTextEntry={!showStudentPassword} placeholder="Değiştirmek istemiyorsanız boş bırakın"/>
                    <TouchableOpacity onPress={() => setShowStudentPassword(!showStudentPassword)} style={styles.eyeIcon}>
                        <Ionicons name={showStudentPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#666"/>
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.modalLabel}>Yeni Şifreyi Doğrula:</Text>
                    <View style={styles.passwordContainerModal}>
                    <TextInput style={styles.modalInputPassword} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showStudentPassword} placeholder="Yeni şifreyi tekrar girin"/>
                    <TouchableOpacity onPress={() => setShowStudentPassword(!showStudentPassword)} style={styles.eyeIcon} >
                        <Ionicons name={showStudentPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#666"/>
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
        </Modal>

        <View style={styles.sectionHeader}>
          <Ionicons name="book-outline" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Derslerim</Text>
        </View>
        {studentInfo.courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.touchableCourseCard}
            onPress={() => navigation.navigate('StudentCourseAttendanceDetail', {
              studentId: studentInfo.id,
              courseId: course.id,
              courseName: course.name
            })}
          >
            <Surface style={styles.courseCardContent} elevation={1}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{course.id}</Text>
                <Text style={styles.courseName}>{course.name}</Text>
              </View>
              <View style={styles.attendanceContainer}>
                <Text style={styles.attendanceLabel}>Genel Devam</Text>
                <View style={styles.attendanceBadge}>
                  <Text style={styles.attendanceValue}>{course.attendance}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#2196F3" style={styles.courseArrowIcon} />
            </Surface>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Ionicons name="grid-outline" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        </View>
        <View style={styles.quickActionsGrid}>
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
            <Ionicons name="calendar-outline" size={32} color="#FFC107" style={styles.actionIcon} />
            <Text style={styles.actionText}>Ders Programı</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Performance')}
          >
            <Ionicons name="stats-chart-outline" size={32} color="#9C27B0" style={styles.actionIcon} />
            <Text style={styles.actionText}>Performans</Text>
          </TouchableOpacity>
           {/* --- NEW COURSE SELECTION BUTTON --- */}
           <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CourseSelection', { studentId: studentInfo.id, initialYear: studentInfo.year })}
          >
            <Ionicons name="add-circle-outline" size={32} color="#FF5722" style={styles.actionIcon} />
            <Text style={styles.actionText}>Ders Seçimi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
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
    content: {
      padding: 16,
      paddingBottom: 32,
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
    },
    profilePhoto: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    profilePhotoPlaceholder: {
      width: 70,
      height: 70,
      borderRadius: 35,
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
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginLeft: 8,
    },
    touchableCourseCard: {
      marginBottom: 12,
      borderRadius: 12,
    },
    courseCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    courseInfo: {
      flex: 1,
      marginRight: 8,
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
    },
    attendanceContainer: {
      alignItems: 'center',
    },
    attendanceLabel: {
      fontSize: 11,
      color: '#666',
      marginBottom: 4,
    },
    attendanceBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
      backgroundColor: '#E3F2FD',
    },
    attendanceValue: {
      fontSize: 13,
      fontWeight: '600',
      color: '#2196F3',
    },
    courseArrowIcon: {
      marginLeft: 8,
    },
    quickActionsGrid: { // Changed from quickActions
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow wrapping to next line
        justifyContent: 'space-around', // Distribute space
        marginTop: 8,
    },
    actionButton: {
        width: '45%', // Approximately two buttons per row with some spacing
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        minHeight: 100,
        justifyContent: 'center',
        marginBottom: 16, // Space between rows of buttons
        marginHorizontal: '2.5%' // Horizontal spacing
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
    modalScrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 25,
      borderRadius: 15,
      width: '90%',
      maxWidth: 400,
      elevation: 5,
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
      marginBottom: 4,
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
      marginBottom: 10,
      backgroundColor: '#f9f9f9',
    },
    passwordContainerModal: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 10,
      backgroundColor: '#f9f9f9',
    },
    modalInputPassword: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      borderWidth: 0,
    },
    eyeIcon: {
      padding: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 25,
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

export default StudentProfile;