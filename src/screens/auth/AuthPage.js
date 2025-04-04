import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('student'); // 'student' veya 'academician'
  const [studentNumber, setStudentNumber] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [academicianNumber, setAcademicianNumber] = useState('');
  const [academicianPassword, setAcademicianPassword] = useState('');
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showAcademicianPassword, setShowAcademicianPassword] = useState(false);

  const handleStudentLogin = () => {
    // Giriş bilgileri kontrolü
    if (!studentNumber || !studentPassword) {
      Alert.alert('Hata', 'Lütfen öğrenci numarası ve şifrenizi giriniz.');
      return;
    }
    
    // Burada gerçek bir API isteği yapılabilir
    // Şimdilik basit bir doğrulama yapıyoruz
    if (studentNumber && studentPassword) {
      // Başarılı giriş
      navigation.navigate('StudentProfile', { studentId: studentNumber });
    } else {
      Alert.alert('Hata', 'Giriş bilgilerinizi kontrol ediniz.');
    }
  };

  const handleAcademicianLogin = () => {
    // Giriş bilgileri kontrolü
    if (!academicianNumber || !academicianPassword) {
      Alert.alert('Hata', 'Lütfen sicil numarası ve şifrenizi giriniz.');
      return;
    }
    
    // Burada gerçek bir API isteği yapılabilir
    // Şimdilik basit bir doğrulama yapıyoruz
    if (academicianNumber && academicianPassword) {
      // Başarılı giriş
      navigation.navigate('AcademicianProfile', { academicianId: academicianNumber });
    } else {
      Alert.alert('Hata', 'Giriş bilgilerinizi kontrol ediniz.');
    }
  };

  const getTabBackgroundColor = (tab) => {
    if (activeTab === tab) {
      return tab === 'student' ? '#2196F3' : '#4CAF50';
    }
    return '#fff';
  };

  return (  
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
        <Image
          source={require('../../assets/iuc-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Yoklama Sistemi</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            { borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: getTabBackgroundColor('student') }
          ]}
          onPress={() => setActiveTab('student')}
        >
          <Ionicons
            name="school-outline"
            size={24}
            color={activeTab === 'student' ? '#fff' : '#757575'}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'student' ? '#fff' : '#757575', fontWeight: activeTab === 'student' ? '600' : '500' }
            ]}
          >
            Öğrenci
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            { borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: getTabBackgroundColor('academician') }
          ]}
          onPress={() => setActiveTab('academician')}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={activeTab === 'academician' ? '#fff' : '#757575'}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'academician' ? '#fff' : '#757575', fontWeight: activeTab === 'academician' ? '600' : '500' }
            ]}
          >
            Akademisyen
          </Text>
        </TouchableOpacity>
      </View>

        <View style={styles.content}>
          {activeTab === 'student' ? (
            <Surface style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="school-outline" size={64} color="#2196F3" />
                <Text style={styles.contentTitle}>Öğrenci Girişi</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Öğrenci Numarası"
                  value={studentNumber}
                  onChangeText={setStudentNumber}
                  keyboardType="number-pad"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifre"
                  value={studentPassword}
                  onChangeText={setStudentPassword}
                  secureTextEntry={!showStudentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowStudentPassword(!showStudentPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showStudentPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.registerButton]}
                  onPress={() => navigation.navigate('StudentRegister')}
                >
                  <Ionicons name="person-add-outline" size={22} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.loginButton]}
                  onPress={handleStudentLogin}
                >
                  <Ionicons name="log-in-outline" size={22} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={styles.forgotPasswordLink}
                onPress={() => navigation.navigate('ForgotPassword', { userType: 'student' })}
              >
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </Surface>
          ) : (
            <Surface style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={64} color="#4CAF50" />
                <Text style={styles.contentTitle}>Akademisyen Girişi</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="id-card-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Sicil Numarası"
                  value={academicianNumber}
                  onChangeText={setAcademicianNumber}
                  keyboardType="number-pad"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifre"
                  value={academicianPassword}
                  onChangeText={setAcademicianPassword}
                  secureTextEntry={!showAcademicianPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowAcademicianPassword(!showAcademicianPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showAcademicianPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.registerButton]}
                  onPress={() => navigation.navigate('AcademicianRegister')}
                >
                  <Ionicons name="person-add-outline" size={22} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.loginButton]}
                  onPress={handleAcademicianLogin}
                >
                  <Ionicons name="log-in-outline" size={22} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={styles.forgotPasswordLink}
                onPress={() => navigation.navigate('ForgotPassword', { userType: 'academician' })}
              >
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </Surface>
          )}
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 5,
  },
  tabText: {
    fontSize: 16,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
  },
  tabContent: {
    padding: 24,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: '#2196F3',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordLink: {
    marginTop: 8,
    padding: 8,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
});

export default AuthPage;