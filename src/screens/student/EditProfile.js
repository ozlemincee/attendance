import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfile = ({ route, navigation }) => {
  const { studentInfo, onSave } = route.params;

  const [name, setName] = useState(studentInfo.name);
  const [department, setDepartment] = useState(studentInfo.department);
  const [year, setYear] = useState(studentInfo.year);

  const handleSave = () => {
    if (!name || !department || !year) {
      Alert.alert('Hata', 'Tüm alanlar doldurulmalıdır!');
      return;
    }

    const updatedInfo = { ...studentInfo, name, department, year };
    onSave(updatedInfo);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>Profili Düzenle</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad Soyad:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Adınızı girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bölüm:</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder="Bölümünüzü girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sınıf:</Text>
        <TextInput
          style={styles.input}
          value={String(year)}
          onChangeText={(text) => setYear(parseInt(text) || '')}
          placeholder="Kaçıncı sınıf?"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;