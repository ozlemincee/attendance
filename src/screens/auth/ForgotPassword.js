import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Modal } from 'react-native';
import { TextInput, Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [showVerification, setShowVerification] = useState(false);

  const handleSendCode = () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi giriniz.');
      return;
    }

    // Burada gerçek bir API çağrısı yapılacak
    // sendVerificationCode(email);
    
    // Simüle edilmiş doğrulama kodu gönderimi
    setShowVerification(true);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      Alert.alert('Hata', 'Lütfen doğrulama kodunu giriniz.');
      return;
    }

    // Burada gerçek bir doğrulama kodu kontrolü yapılacak
    if (verificationCode === '123456') {
      setShowVerification(false);
      setStep(2);
    } else {
      Alert.alert('Hata', 'Geçersiz doğrulama kodu.');
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    // Burada gerçek bir API çağrısı yapılacak
    // resetPassword(email, newPassword);
    
    Alert.alert(
      'Başarılı',
      'Şifreniz başarıyla güncellendi.',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.content}>
        <Surface style={styles.card}>
          {step === 1 ? (
            <>
              <Text style={styles.title}>E-posta Adresinizi Girin</Text>
              <Text style={styles.description}>
                Kayıtlı e-posta adresinize bir doğrulama kodu göndereceğiz.
              </Text>

              <TextInput
                label="E-posta"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleSendCode}
              >
                <Text style={styles.buttonText}>Doğrulama Kodu Gönder</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Yeni Şifrenizi Belirleyin</Text>
              <Text style={styles.description}>
                Lütfen yeni şifrenizi giriniz.
              </Text>

              <TextInput
                label="Yeni Şifre"
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                secureTextEntry
              />

              <TextInput
                label="Yeni Şifre Tekrar"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
              </TouchableOpacity>
            </>
          )}
        </Surface>
      </View>

      <Modal
        visible={showVerification}
        animationType="slide"
      >
        <View style={styles.verificationContainer}>
          <Text style={styles.verificationTitle}>E-posta Doğrulama</Text>
          <Text style={styles.verificationText}>
            {email} adresine gönderilen 6 haneli doğrulama kodunu giriniz.
          </Text>
          <TextInput
            label="Doğrulama Kodu"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyCode}
          >
            <Text style={styles.buttonText}>Doğrula</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  verificationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ForgotPassword;
