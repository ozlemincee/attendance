import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Ionicons from "react-native-vector-icons/Ionicons";

const cameraGuides = [
    "Lütfen yüzünüzü kameranın merkezine yerleştirin",
    "Şimdi lütfen yüzünüzü hafifçe sağa çevirin",
    "Şimdi lütfen yüzünüzü hafifçe sola çevirin",
    "Şimdi lütfen yüzünüzü hafifçe yukarı kaldırın",
    "Son fotoğraf için tekrar normal poz verin"
];

export default function FaceRegister({ navigation, route }) {
    const { onPhotosCaptured } = route.params;
    const cameraDevices = useCameraDevices(); // Hook'un dönüş değerini al
    const { devices, isLoading, error } = cameraDevices; // Buradan devices ve diğer durumları al
    const cameraDevice = devices?.front; // devices null veya undefined olabilir, bu yüzden güvenli erişim kullan
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [photoCount, setPhotoCount] = useState(0);
    const [currentCameraGuide, setCurrentCameraGuide] = useState(cameraGuides[0]);
    const [capturedPhotos, setCapturedPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermission();
            setHasPermission(cameraPermission === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto({
                    quality: 80,
                    skipMetadata: true,
                });

                const newPhotos = [...capturedPhotos, photo.path];
                setCapturedPhotos(newPhotos);

                const nextPhotoCount = photoCount + 1;
                setPhotoCount(nextPhotoCount);

                if (nextPhotoCount >= cameraGuides.length) {
                    setCurrentCameraGuide("Yüz kayıt işlemi tamamlandı!");
                    Alert.alert("Başarılı", "Yüz kayıt işlemi tamamlandı.", [
                        { text: "Tamam", onPress: () => {
                            onPhotosCaptured(newPhotos);
                            navigation.goBack();
                        }},
                    ]);
                } else {
                    setCurrentCameraGuide(cameraGuides[nextPhotoCount]);
                    Alert.alert(
                        "Fotoğraf Alındı",
                        `${nextPhotoCount}/${cameraGuides.length} fotoğraf alındı.\n${cameraGuides[nextPhotoCount]}`,
                        [{ text: "Devam", onPress: () => console.log("Continue with next photo") }]
                    );
                }
            } catch (error) {
                console.error("Camera error:", error);
                Alert.alert("Hata", "Fotoğraf çekilirken bir hata oluştu: " + error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            {hasPermission === null || isLoading ? (
                <Text style={styles.text}>Kamera yükleniyor veya izin isteniyor...</Text>
            ) : hasPermission === false ? (
                <View style={styles.permissionContainer}>
                    <Text style={styles.text}>Kamera izni reddedildi. Lütfen cihazınızın ayarlarından izin verin.</Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={() => Linking.openSettings()}>
                        <Text style={styles.buttonText}>Ayarları Aç</Text>
                    </TouchableOpacity>
                </View>
            ) : error ? (
                <Text style={styles.text}>Kamera hatası: {error?.message}</Text>
            ) : cameraDevice == null ? (
                <Text style={styles.text}>Ön kamera bulunamadı.</Text>
            ) : (
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={cameraDevice}
                    isActive={true}
                    photo={true}
                />
            )}

            {hasPermission === true && cameraDevice !== null && (
                <View style={styles.overlay}>
                    <View style={styles.guideContainer}>
                        <Text style={styles.guideText}>{currentCameraGuide}</Text>
                        <Text style={styles.photoCountText}>Fotoğraf: {photoCount}/{cameraGuides.length}</Text>
                    </View>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={photoCount >= cameraGuides.length}>
                        <Ionicons name="camera" size={60} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 20,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 5,
    },
    guideText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    photoCountText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
});