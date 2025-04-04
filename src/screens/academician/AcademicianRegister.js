import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Modal, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput as PaperInput, Modal as PaperModal, Paragraph, useTheme, ProgressBar } from 'react-native-paper';
import { kvkkText } from "../../data/kvkk"; // Import KVKK Text
import Ionicons from "react-native-vector-icons/Ionicons";
import facultiesData from "../../data/faculties.json";


const { width, height } = Dimensions.get('window');

export default function StudentRegister({ navigation }) {
  const theme = useTheme();
  
  
  const [formData, setFormData] = useState({
    name: "",
    academicNo: "",
    email: "",
    address: "",
    password: "",
    verificationCode: "",
    isVerified: false,
    studentFaculty: "",
    studentDepartment: "",
    studentClass: "",
    kvkkAccepted: false,
    facePhotos: [], // Array to store face photos
  });
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const cameraRef = useRef(null);
  const [kvkkVisible, setKvkkVisible] = useState(false);
  const [cameraType, setCameraType] = useState('front');



  const handleFacultyChange = (faculty) => {
    setSelectedFaculty(faculty);
    const selected = facultiesData.find((f) => f.name === faculty);
    setDepartments(selected ? selected.departments : []);
    setFormData((prev) => ({ ...prev, studentFaculty: faculty }));
  };



 

  const sendVerificationCode = () => {
    if (!formData.kvkkAccepted) {
      Alert.alert("Hata", "KVKK sözleşmesini kabul etmelisiniz.");
      return;
    }
    if (formData.email.includes("@")) {
      Alert.alert("Doğrulama Kodu Gönderildi", "Lütfen e-postanızı kontrol edin.");
      setFormData((prev) => ({ ...prev, isVerified: true }));
    } else {
      Alert.alert("Geçersiz E-posta", "Lütfen geçerli bir e-posta girin.");
    }
  };

  const handleRegister = async () => {
    if (!formData.kvkkAccepted) {
      Alert.alert("Hata", "KVKK sözleşmesini kabul etmelisiniz.");
      return;
    }else {
      Alert.alert("Doğrulama Hatası", "Lütfen doğru kodu girin.");
    }
  };

 

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
        <PaperInput
          label="Ad Soyad"
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
          mode="outlined"
          left={<PaperInput.Icon icon="account" />}
        />
        <PaperInput
          label="Sicil No"
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, acdemicNo: text }))}
          mode="outlined"
          left={<PaperInput.Icon icon="card-account-details" />}
        />
        <PaperInput
          label="E-Posta"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
          mode="outlined"
          left={<PaperInput.Icon icon="email" />}
        />
        <PaperInput
          label="Telefon"
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: Number }))}
          mode="outlined"
          left={<PaperInput.Icon icon="phone" />}
        />
        <PaperInput
          label="Adres"
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, address: text }))}
          mode="outlined"
          left={<PaperInput.Icon icon="home" />}
        />
        <PaperInput
          label="Şifre"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
          mode="outlined"
          left={<PaperInput.Icon icon="lock" />}
        />
        
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Bölüm Bilgileri</Text>
        <Text style={styles.label}>Fakülte:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFaculty}
            onValueChange={handleFacultyChange}
            style={styles.picker}
          >
            <Picker.Item label="Fakülte Seçin" value="" />
            {facultiesData.map((faculty) => (
              <Picker.Item key={faculty.name} label={faculty.name} value={faculty.name} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Bölüm:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={(itemValue) => {
              setSelectedDepartment(itemValue);
              setFormData((prev) => ({ ...prev, studentDepartment: itemValue }));
            }}
            enabled={departments.length > 0}
            style={styles.picker}
          >
            <Picker.Item label="Bölüm Seçin" value="" />
            {departments.map((department) => (
              <Picker.Item key={department} label={department} value={department} />
            ))}
          </Picker>
        </View>
      </View>
      
      
    
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>KVKK Onayı</Text>
        <TouchableOpacity onPress={() => setKvkkVisible(true)} style={styles.linkButton}>
          <Text style={styles.linkText}>KVKK Metnini Oku</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.kvkkButton, formData.kvkkAccepted ? styles.kvkkAccepted : null]}
          onPress={() => setFormData((prev) => ({ ...prev, kvkkAccepted: !prev.kvkkAccepted }))}
        >
          <Ionicons 
            name={formData.kvkkAccepted ? "checkbox" : "square-outline"} 
            size={24} 
            color={formData.kvkkAccepted ? "#fff" : "#007bff"} 
            style={styles.buttonIcon} 
          />
          <Text style={[styles.buttonText, formData.kvkkAccepted ? null : styles.darkText]}>
            KVKK'yı Onaylıyorum
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Hesap Doğrulama</Text>
        {!formData.isVerified ? (
          <Button
            mode="contained"
            onPress={sendVerificationCode}
            style={styles.verificationButton}
            icon="email-send"
          >
            Doğrulama Kodu Gönder
          </Button>
        ) : (
          <>
            <PaperInput
              label="Doğrulama Kodu"
              style={styles.input}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, verificationCode: text }))}
              mode="outlined"
              left={<PaperInput.Icon icon="key" />}
            />
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              icon="account-check"
            >
              Kaydol
            </Button>
          </>
        )}
      </View>

     

      {/* KVKK Modal */}
      <PaperModal visible={kvkkVisible} onDismiss={() => setKvkkVisible(false)}>
        <ScrollView style={styles.kvkkModal}>
          <TouchableOpacity onPress={() => setKvkkVisible(false)} style={styles.modalCloseButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.kvkkTitle}>KVKK Aydınlatma Metni</Text>
          <Paragraph style={styles.kvkkText}>{kvkkText}</Paragraph>
        </ScrollView>
      </PaperModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  linkButton: {
    padding: 10,
    marginBottom: 10,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  kvkkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  kvkkAccepted: {
    backgroundColor: '#007bff',
  },
  verificationButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
  },
  faceRegButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  darkText: {
    color: '#333',
  },
  buttonIcon: {
    marginRight: 10,
  },
  progressContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraGuideContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  cameraGuideText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  photoCountText: {
    color: '#fff',
    fontSize: 16,
  },
  cameraText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraButton: {
    backgroundColor: '#007bff',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButton: {
    position: 'absolute',
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 30,
  },
  closeButton: {
    position: 'absolute',
    left: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 30,
  },
  kvkkModal: {
    padding: 20,
    backgroundColor: '#fff',
    maxHeight: '80%',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  kvkkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  kvkkText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
