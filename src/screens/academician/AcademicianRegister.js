import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput as PaperInput, Modal as PaperModal, Paragraph, useTheme, ProgressBar } from 'react-native-paper';
import { kvkkText } from "../../data/kvkk";
import Ionicons from "react-native-vector-icons/Ionicons";
import facultiesData from "../../data/faculties.json";


const { width, height } = Dimensions.get('window');



export default function StudentRegister({ navigation }) {
    const [formData, setFormData] = useState({
        name: "",
        sicilNo: "",
        email: "",
        address: "",
        password: "",
        verificationCode: "",
        isVerified: false,
        academicFaculty: "",
        academicDepartment: "",
        kvkkAccepted: false,
      
    });
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const [kvkkVisible, setKvkkVisible] = useState(false);

    const handleFacultyChange = (faculty) => {
        setSelectedFaculty(faculty);
        const selected = facultiesData.find((f) => f.name === faculty);
        setDepartments(selected ? selected.departments : []);
        setFormData((prev) => ({ ...prev, academicFaculty: faculty, academicDepartment: "" }));
        setSelectedDepartment("");
    };

    const handlePhotosCaptured = (photos) => {
        setFormData(prev => ({ ...prev, facePhotos: photos }));
        Alert.alert("Başarılı", `${photos.length} adet yüz fotoğrafı alındı.`);
    };

    const sendVerificationCode = () => {
        if (!formData.kvkkAccepted) {
            Alert.alert("Hata", "KVKK sözleşmesini kabul etmelisiniz.");
            return;
        }
        
        if (!formData.name || !formData.sicilNo || !formData.email || !formData.password || !formData.academicFaculty || !formData.academicDepartment ) {
            Alert.alert("Eksik Bilgi", "Lütfen tüm kişisel ve bölüm bilgilerini doldurun.");
            return;
        }

        if (formData.email.includes("@")) {
            Alert.alert("Doğrulama Kodu Gönderildi", "Lütfen e-postanızı kontrol edin. (Mock code: 1234)");
            setFormData((prev) => ({ ...prev, isVerified: true }));
        } else {
            Alert.alert("Geçersiz E-posta", "Lütfen geçerli bir e-posta girin.");
        }
    };

    const handleRegister = async () => {
        if (!formData.kvkkAccepted) {
            Alert.alert("Hata", "KVKK sözleşmesini kabul etmelisiniz.");
            return;
        }
        
        if (!formData.name || !formData.sicilNo || !formData.email || !formData.password || !formData.academicFaculty || !formData.academicDepartment ) {
            Alert.alert("Eksik Bilgi", "Lütfen tüm kişisel ve bölüm bilgilerini doldurun.");
            return;
        }

        if (formData.isVerified && formData.verificationCode === "1234") {
            console.log("Registering student with data:", formData);
            Alert.alert("Kayıt Başarılı", "Akademisyen profiline yönlendiriliyorsunuz.");
            // navigation.navigate("StudentProfile", { studentInfo: formData });
            // navigation.goBack();
        } else if (!formData.isVerified) {
            Alert.alert("Doğrulama Gerekli", "Lütfen önce e-posta adresinize gönderilen doğrulama kodunu alın.");
        } else {
            Alert.alert("Doğrulama Hatası", "Lütfen doğru kodu girin.");
        }
    };


    return (
        <ScrollView style={styles.container} scrollEnabled={!kvkkVisible}>
            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
                <PaperInput label="Ad Soyad" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))} mode="outlined" left={<PaperInput.Icon icon="account" />} value={formData.name} />
                <PaperInput label="Öğrenci No" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, sicilNo: text }))} mode="outlined" keyboardType="number-pad" left={<PaperInput.Icon icon="card-account-details" />} value={formData.studentNo} />
                <PaperInput label="E-Posta" keyboardType="email-address" autoCapitalize="none" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))} mode="outlined" left={<PaperInput.Icon icon="email" />} value={formData.email} />
                <PaperInput label="Telefon (Opsiyonel)" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))} mode="outlined" keyboardType="phone-pad" left={<PaperInput.Icon icon="phone" />} value={formData.phone} />
                <PaperInput label="Adres (Opsiyonel)" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, address: text }))} mode="outlined" left={<PaperInput.Icon icon="home" />} value={formData.address} />
                <PaperInput label="Şifre" secureTextEntry style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))} mode="outlined" left={<PaperInput.Icon icon="lock" />} value={formData.password} />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Bölüm Bilgileri</Text>
                <Text style={styles.label}>Fakülte:</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={selectedFaculty} onValueChange={handleFacultyChange} style={styles.picker}>
                        <Picker.Item label="Fakülte Seçin" value="" />
                        {facultiesData.map((faculty) => (
                            <Picker.Item key={faculty.name} label={faculty.name} value={faculty.name} color="#888" />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Bölüm:</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={selectedDepartment} onValueChange={(itemValue) => { setSelectedDepartment(itemValue); setFormData((prev) => ({ ...prev, studentDepartment: itemValue })); }} enabled={departments.length > 0} style={styles.picker}>
                        <Picker.Item label="Bölüm Seçin" value="" />
                        {departments.map((department) => (
                            <Picker.Item key={department} label={department} value={department} color="#888"  />
                        ))}
                    </Picker>
                </View>
            </View>

            

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>KVKK Onayı</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('KvkkText')} // <-- Yeni ekrana yönlendirme
                        style={styles.linkButton}
                        >
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
                        disabled={
                            
                            !formData.kvkkAccepted ||
                            !formData.email ||
                            !formData.email.includes('@') ||
                            !formData.name || !formData.sicilNo || !formData.password || !formData.academicFaculty || !formData.academicDepartment
                        }
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
                            keyboardType="number-pad"
                            left={<PaperInput.Icon icon="key" />}
                            value={formData.verificationCode}
                        />
                        <Button
                            mode="contained"
                            onPress={handleRegister}
                            style={styles.registerButton}
                            icon="account-check"
                            disabled={
                                !formData.kvkkAccepted ||
                                formData.facePhotos.length < cameraGuides.length ||
                                !formData.isVerified ||
                                formData.verificationCode !== "1234" ||
                                !formData.name || !formData.sicilNo || !formData.password || !formData.academicFaculty || !formData.academicDepartment
                            }
                        >
                            Kaydol
                        </Button>
                    </>
                )}
            </View>

            <PaperModal visible={kvkkVisible} onDismiss={() => setKvkkVisible(false)} contentContainerStyle={styles.kvkkModalContainer}>
                <ScrollView style={styles.kvkkModalContent}>
                    <TouchableOpacity onPress={() => setKvkkVisible(false)} style={styles.modalCloseButton}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.kvkkTitle}>KVKK Aydınlatma Metni</Text>
                    <Text style={styles.kvkkText}>{kvkkText}</Text>
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
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    linkButton: {
        paddingVertical: 8,
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
        borderColor: '#007bff',
    },
    verificationButton: {
        backgroundColor: '#28a745',
        padding: 5,
        marginTop: 5,
    },
    registerButton: {
        backgroundColor: '#007bff',
        padding: 5,
        marginTop: 10,
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
   successText: {
       fontSize: 14,
       color: '#28a745',
       textAlign: 'center',
       marginTop: 5,
   },
  // KVKK Modal Styles
   kvkkModalContainer: {
       backgroundColor: '#fff',
       padding: 20,
       flex: 1,
       maxHeight: height * 0.8,
       marginHorizontal: 10, // Add horizontal margin
       borderRadius: 20, // Add rounded corners
   },
  kvkkModalContent: {
    maxHeight: height * 0.7,// Limit modal height
    
},
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  kvkkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  kvkkText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
});