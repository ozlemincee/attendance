import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput as PaperInput, Modal as PaperModal, Paragraph, useTheme, ProgressBar } from 'react-native-paper';
import { kvkkText } from "../../data/kvkk";
import Ionicons from "react-native-vector-icons/Ionicons";
import facultiesData from "../../data/faculties.json";
import FaceRegister from "./FaceRegister"; // Doğru import

const { width, height } = Dimensions.get('window');

const cameraGuides = [
    "Lütfen yüzünüzü kameranın merkezine yerleştirin",
    "Şimdi lütfen yüzünüzü hafifçe sağa çevirin",
    "Şimdi lütfen yüzünüzü hafifçe sola çevirin",
    "Şimdi lütfen yüzünüzü hafifçe yukarı kaldırın",
    "Son fotoğraf için tekrar normal poz verin"
];

export default function StudentRegister({ navigation }) {
    const [formData, setFormData] = useState({
        name: "",
        studentNo: "",
        email: "",
        address: "",
        password: "",
        verificationCode: "",
        isVerified: false,
        studentFaculty: "",
        studentDepartment: "",
        studentClass: "",
        kvkkAccepted: false,
        facePhotos: [],
    });
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const [kvkkVisible, setKvkkVisible] = useState(false);

    const handleFacultyChange = (faculty) => {
        setSelectedFaculty(faculty);
        const selected = facultiesData.find((f) => f.name === faculty);
        setDepartments(selected ? selected.departments : []);
        setFormData((prev) => ({ ...prev, studentFaculty: faculty, studentDepartment: "" }));
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
        if (formData.facePhotos.length < cameraGuides.length) {
            Alert.alert("Hata", `Lütfen önce ${cameraGuides.length} farklı açıdan yüz kaydı yapınız.`);
            return;
        }
        if (!formData.name || !formData.studentNo || !formData.email || !formData.password || !formData.studentFaculty || !formData.studentDepartment || !formData.studentClass) {
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
        if (formData.facePhotos.length < cameraGuides.length) {
            Alert.alert("Hata", `Lütfen ${cameraGuides.length} farklı açıdan yüz fotoğrafı çekin.`);
            return;
        }
        if (!formData.name || !formData.studentNo || !formData.email || !formData.password || !formData.studentFaculty || !formData.studentDepartment || !formData.studentClass) {
            Alert.alert("Eksik Bilgi", "Lütfen tüm kişisel ve bölüm bilgilerini doldurun.");
            return;
        }

        if (formData.isVerified && formData.verificationCode === "1234") {
            console.log("Registering student with data:", formData);
            Alert.alert("Kayıt Başarılı", "Öğrenci profiline yönlendiriliyorsunuz.");
            // navigation.navigate("StudentProfile", { studentInfo: formData });
            // navigation.goBack();
        } else if (!formData.isVerified) {
            Alert.alert("Doğrulama Gerekli", "Lütfen önce e-posta adresinize gönderilen doğrulama kodunu alın.");
        } else {
            Alert.alert("Doğrulama Hatası", "Lütfen doğru kodu girin.");
        }
    };

    const startFaceRegistration = () => {
        if (!formData.kvkkAccepted) {
            Alert.alert("Hata", "Lütfen önce KVKK sözleşmesini kabul edin.");
            return;
        }
        navigation.navigate("FaceRegister", { onPhotosCaptured: handlePhotosCaptured });
    };

    const isFaceRegButtonDisabled = !formData.kvkkAccepted || formData.facePhotos.length === cameraGuides.length;
    const getFaceRegButtonText = () => {
        if (!formData.kvkkAccepted) return "KVKK'yı Kabul Edin";
        if (formData.facePhotos.length === 0) return "Yüz Kaydı Başlat";
        if (formData.facePhotos.length === cameraGuides.length) return "Yüz Kaydı Tamamlandı";
        return `Yüz Kaydı Yapılıyor (<span class="math-inline">\{formData\.facePhotos\.length\}/</span>{cameraGuides.length})`;
    };
    const getFaceRegButtonIcon = () => {
        if (!formData.kvkkAccepted) return "warning-outline";
        if (formData.facePhotos.length === cameraGuides.length) return "check-circle-outline";
        return "camera";
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
                <PaperInput label="Ad Soyad" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))} mode="outlined" left={<PaperInput.Icon icon="account" />} value={formData.name} />
                <PaperInput label="Öğrenci No" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, studentNo: text }))} mode="outlined" keyboardType="number-pad" left={<PaperInput.Icon icon="card-account-details" />} value={formData.studentNo} />
                <PaperInput label="E-Posta" keyboardType="email-address" autoCapitalize="none" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))} mode="outlined" left={<PaperInput.Icon icon="email" />} value={formData.email} />
                <PaperInput label="Telefon (Opsiyonel)" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))} mode="outlined" keyboardType="phone-pad" left={<PaperInput.Icon icon="phone" />} value={formData.phone} />
                <PaperInput label="Adres (Opsiyonel)" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, address: text }))} mode="outlined" left={<PaperInput.Icon icon="home" />} value={formData.address} />
                <PaperInput label="Şifre" secureTextEntry style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))} mode="outlined" left={<PaperInput.Icon icon="lock" />} value={formData.password} />
                <PaperInput label="Sınıf" style={styles.input} onChangeText={(text) => setFormData((prev) => ({ ...prev, studentClass: text }))} mode="outlined" keyboardType="numeric" left={<PaperInput.Icon icon="school" />} value={formData.studentClass} />
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
                            <Picker.Item key={department} label={department} value={department} color="#888" />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Yüz Kaydı</Text>
                <TouchableOpacity
                    style={[styles.faceRegButton, formData.facePhotos.length === cameraGuides.length && styles.faceRegButtonDone]}
                    onPress={startFaceRegistration}
                    disabled={isFaceRegButtonDisabled}
                >
                    <Ionicons
                        name={getFaceRegButtonIcon()}
                        size={24}
                        color="white"
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>
                        {getFaceRegButtonText()}
                    </Text>
                </TouchableOpacity>

                {formData.facePhotos.length > 0 && formData.facePhotos.length < cameraGuides.length && (
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressText}>Yüz Kaydı İlerlemesi: {formData.facePhotos.length}/{cameraGuides.length}</Text>
                        <ProgressBar progress={formData.facePhotos.length / cameraGuides.length} color="#007bff" style={styles.progressBar} />
                    </View>
                )}

                {formData.facePhotos.length === cameraGuides.length && (
                    <Text style={styles.successText}>Yüz kayıt işlemi başarıyla tamamlandı!</Text>
                )}
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>KVKK Onayı</Text>
                <TouchableOpacity 
                                    onPress={() => navigation.navigate('KvkkText')} // <-- Yeni ekrana yönlendirme
                                        style={styles.linkButton}
                                        >
                                      <Text style={styles.linkText}>KVKK Metnini Oku</Text>
                                </TouchableOpacity>
                <PaperModal visible={kvkkVisible} onDismiss={() => setKvkkVisible(false)} contentContainerStyle={styles.kvkkModalContainer}>
                {/* Modal içeriği için max yüksekliği kontrol eden bir View */}
                <View style={styles.kvkkModalContentWrapper}>
                    {/* Kapatma butonu - Metin akışını etkilememesi için absolute konumlandırılacak */}
                    <TouchableOpacity onPress={() => setKvkkVisible(false)} style={styles.modalCloseButton}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.kvkkTitle}>KVKK Aydınlatma Metni</Text>

                    {/* KVKK metnini içeren kaydırılabilir alan */}
                    <ScrollView style={styles.kvkkTextScrollView}> {/* ScrollView için ayrı stil */}
                        <Text style={styles.kvkkText}>{kvkkText}</Text>
                    </ScrollView>
                </View>
            </PaperModal>
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
                            formData.facePhotos.length < cameraGuides.length ||
                            !formData.kvkkAccepted ||
                            !formData.email ||
                            !formData.email.includes('@') ||
                            !formData.name || !formData.studentNo || !formData.password || !formData.studentFaculty || !formData.studentDepartment || !formData.studentClass
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
                                !formData.name || !formData.studentNo || !formData.email || !formData.password || !formData.studentFaculty || !formData.studentDepartment || !formData.studentClass
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
    
  faceRegButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    opacity: 1, // Default opacity
  },
   faceRegButtonDisabled: {
       opacity: 0.6, // Reduced opacity for disabled state
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

  // Camera Modal Styles
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
   cameraOverlay: {
       position: 'absolute',
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       zIndex: 1, // Ensure overlay is above camera feed
   },
  cameraGuideContainer: {
    position: 'absolute',
    top: 60, // Positioned lower to avoid status bar
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
    marginTop: 'auto', // Center vertically
    marginBottom: 'auto', // Center vertically
    paddingHorizontal: 20, // Add some padding
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
    zIndex: 2, // Ensure controls are above overlay
  },
  cameraButton: {
    backgroundColor: '#007bff',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
   cameraOverlayCloseButton: {
     position: 'absolute',
     top: 60, // Positioned similar to guide container but on the side
     left: 20,
     zIndex: 2, // Ensure close button is above overlay
   },

  // KVKK Modal Styles
     kvkkModalContainer: {
           backgroundColor: '#fff',
           padding: 20, // Wrapper View'ın etrafındaki boşluk
           marginHorizontal: 20,
           borderRadius: 10,
            // maxHeight'i buradan kaldırıp kvkkModalContentWrapper'a taşıdık
       },
      kvkkModalContentWrapper: { // ScrollView ve başlıkları sarmalayan View
            maxHeight: height * 0.7, // Modal içeriğinin maksimum yüksekliği
            width: '100%', // Genellikle modal container'ın içindeki boşluğu kaplar
            // position: 'relative', // Absolute konumlandırılan butonlar için referans noktası
        },
      kvkkTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15, // Başlık altındaki boşluk
        textAlign: 'center',
        color: '#333',
        // Kapatma butonu absolute olduğu için başlık metninin kaymasını engellemek için 
        // sağ padding eklemek faydalı olabilir. İkonun boyutuna göre ayarlayın.
        paddingRight: 30, 
      },
      kvkkTextScrollView: { // Metni saran ScrollView'ın stili
        // ScrollView'un kendi yüksekliğini içeriğe göre ayarlamasına izin verin, 
        // üst View max yüksekliği kontrol ediyor.
        // İhtiyaca göre padding veya margin eklenebilir:
        // paddingBottom: 10, 
      },
      kvkkText: { // Paragraph component'inin stili
        fontSize: 14,
        lineHeight: 22,
        color: '#555',
         // Burada flex: 1 veya sabit bir yükseklik olmamalı
      },
      modalCloseButton: {
        // Position absolute kullanarak sağ üst köşeye sabitleyin
        position: 'absolute',
        top: 5, // Üstten boşluk
        right: 5, // Sağdan boşluk
        padding: 5, // Dokunma alanını kolaylaştırır
        zIndex: 1, // Diğer içeriklerin üstünde görünmesini sağlar
      },
});