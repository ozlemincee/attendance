
import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
    } else {
      Alert.alert('Başarılı', 'Şifreniz güncellendi.');
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={styles.title}>Ayarlar</Text>

      {/* Koyu Mod Anahtarı */}
      <View style={styles.optionRow}>
        <Text style={styles.label}>Koyu Mod</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Şifre Değiştirme */}
      <TextInput
        placeholder="Yeni Şifre"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Şifreyi Değiştir" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 20,
    padding: 8,
    fontSize: 16,
  },
});

export default Settings;
