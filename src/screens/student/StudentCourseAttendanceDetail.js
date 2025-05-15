import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit'; // Grafik kütüphanesi

// Mock Data (Normalde API'den çekilir) - İzinli durumu kaldırıldı
const MOCK_ATTENDANCE_DATA = {
  'CS101': [
    { date: '2025-04-01', status: 'present' }, { date: '2025-04-03', status: 'present' },
    { date: '2025-04-08', status: 'absent' }, { date: '2025-04-10', status: 'present' },
    { date: '2025-04-15', status: 'present' }, { date: '2025-04-17', status: 'present' }, // excused -> present yapıldı
    { date: '2025-04-22', status: 'present' }, { date: '2025-04-24', status: 'absent' },
    { date: '2025-04-29', status: 'present' }, { date: '2025-05-01', status: 'present' },
  ],
  'CS202': [
    { date: '2025-04-02', status: 'present' }, { date: '2025-04-04', status: 'absent' },
    { date: '2025-04-09', status: 'absent' }, { date: '2025-04-11', status: 'present' },
    { date: '2025-04-16', status: 'present' }, { date: '2025-04-18', status: 'present' },
    { date: '2025-04-23', status: 'absent' }, { date: '2025-04-25', status: 'present' },
    { date: '2025-04-30', status: 'present' },
  ],
  'CS303': [
    { date: '2025-04-01', status: 'present' }, { date: '2025-04-05', status: 'present' },
    { date: '2025-04-08', status: 'present' }, { date: '2025-04-12', status: 'present' },
    { date: '2025-04-15', status: 'present' }, { date: '2025-04-19', status: 'absent' },
    { date: '2025-04-22', status: 'present' }, { date: '2025-04-26', status: 'present' },
    { date: '2025-04-29', status: 'present' },
  ],
   'MATH101': [
    { date: '2025-04-03', status: 'present' }, { date: '2025-04-06', status: 'absent' },
    { date: '2025-04-10', status: 'present' }, { date: '2025-04-13', status: 'present' }, // excused -> present yapıldı
    { date: '2025-04-17', status: 'present' }, { date: '2025-04-20', status: 'absent' },
    { date: '2025-04-24', status: 'present' }, { date: '2025-04-27', status: 'present' },
  ],
};

const screenWidth = Dimensions.get('window').width;

const StudentCourseAttendanceDetail = ({ route, navigation }) => {
  const { studentId, courseId, courseName } = route.params;

  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const data = MOCK_ATTENDANCE_DATA[courseId] || [];
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAllRecords(data);

    if (data.length > 0) {
       const firstRecordDate = new Date(data[data.length - 1].date);
       setStartDate(firstRecordDate);
    } else {
       const oneMonthAgo = new Date();
       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
       setStartDate(oneMonthAgo);
    }
  }, [courseId, studentId]);

  useEffect(() => {
    if (!startDate || !endDate) {
        setFilteredRecords(allRecords);
        return;
    }
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const filtered = allRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startOfDay && recordDate <= endOfDay;
    });
    setFilteredRecords(filtered);
  }, [allRecords, startDate, endDate]);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    if (endDate && currentDate > endDate) {
        setEndDate(currentDate);
        Alert.alert("Uyarı","Başlangıç tarihi, bitiş tarihinden sonra olamaz. Bitiş tarihi güncellendi.");
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
     if (startDate && currentDate < startDate) {
        setStartDate(currentDate);
        Alert.alert("Uyarı","Bitiş tarihi, başlangıç tarihinden önce olamaz. Başlangıç tarihi güncellendi.");
    }
  };

  // Grafik için veriyi hazırla - İzinli durumu kaldırıldı
  const chartData = useMemo(() => {
    let present = 0;
    let absent = 0;
    // excused sayacı kaldırıldı

    filteredRecords.forEach(record => {
      if (record.status === 'present') present++;
      else if (record.status === 'absent') absent++;
      // excused kontrolü kaldırıldı
    });

    const data = [];
    if (present > 0) data.push({ name: 'Var', count: present, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 14 });
    if (absent > 0) data.push({ name: 'Yok', count: absent, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 14 });
    // excused ekleme bloğu kaldırıldı

     if (data.length === 0 && filteredRecords.length === 0 && allRecords.length > 0) {
       // Veri var ama filtrelenmiş veya hiç yoklama girilmemişse (Bu koşul aynı kalabilir)
       return null;
     }
     if (data.length === 0 && allRecords.length === 0) {
         // Hiç veri yoksa
         return null;
     }
     // Eğer filtrelenmiş aralıkta kayıt yoksa (Bu koşul da aynı kalabilir)
      if (data.length === 0 && filteredRecords.length > 0) {
         return null;
      }

    // Eğer chartData hesaplandıysa ama içi boşsa (örn. sadece 0'lar varsa), null döndürme kontrolü eklenebilir.
    // Ancak mevcut durumda (present > 0 veya absent > 0 kontrolü ile) bu pek olası değil.
    if (data.length === 0) return null;


    return data;
  }, [filteredRecords, allRecords]);


  // Stil fonksiyonu - İzinli durumu kaldırıldı
  const getStatusStyle = (status) => {
    switch (status) {
      case 'present': return styles.statusPresent;
      case 'absent': return styles.statusAbsent;
      // case 'excused' kaldırıldı
      default: return {};
    }
  };

  // Metin fonksiyonu - İzinli durumu kaldırıldı
  const getStatusText = (status) => {
     switch (status) {
      case 'present': return 'VAR';
      case 'absent': return 'YOK';
      // case 'excused' kaldırıldı
      default: return status; // Bilinmeyen durumlar için
    }
  }

  const formatDate = (date) => {
      if (!date) return 'Belirtilmemiş';
       const d = new Date(date);
       const day = String(d.getDate()).padStart(2, '0');
       const month = String(d.getMonth() + 1).padStart(2, '0');
       const year = d.getFullYear();
       return `${day}.${month}.${year}`;
  }

  return (
    // JSX KISMI DEĞİŞMEDİ
    <ScrollView style={styles.container}>
       <View style={styles.header}>
         {/* Geri Butonu Eklendi */}
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>{courseName} - Yoklama</Text>
         <View style={{width: 40}} /> {/* Başlığı ortalamak için boşluk */}
      </View>

      {/* Tarih Filtreleme */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
          <Ionicons name="calendar-outline" size={20} color="#2196F3" />
          <Text style={styles.dateText}>Başlangıç: {formatDate(startDate)}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            maximumDate={new Date()}
          />
        )}
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
           <Ionicons name="calendar-outline" size={20} color="#2196F3" />
          <Text style={styles.dateText}>Bitiş: {formatDate(endDate)}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
            minimumDate={startDate || undefined}
            maximumDate={new Date()}
          />
        )}
      </View>

       {/* Grafik Alanı */}
       <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Filtrelenmiş Yoklama Özeti</Text>
          {chartData && chartData.length > 0 ? ( // chartData null değilse ve içinde veri varsa
             <PieChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                   backgroundColor: '#ffffff',
                   backgroundGradientFrom: '#ffffff',
                   backgroundGradientTo: '#ffffff',
                   decimalPlaces: 0,
                   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                   style: {
                      borderRadius: 16,
                   },
                }}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                style={styles.chartStyle}
             />
          ) : ( // Grafik gösterilemiyorsa uygun mesajı göster
            filteredRecords.length === 0 && allRecords.length > 0 ?
             <Text style={styles.noDataText}>Seçili tarih aralığında yoklama kaydı bulunamadı.</Text>
             : allRecords.length === 0 ? // Hiç kayıt yoksa
             <Text style={styles.noDataText}>Bu ders için henüz yoklama kaydı girilmemiş.</Text>
             : <Text style={styles.noDataText}>Grafik oluşturmak için yeterli veri yok.</Text> // Diğer durumlar (örn. sadece 0 olan kayıtlar)
          )}
       </View>


      {/* Yoklama Listesi */}
      <View style={styles.listSection}>
         <Text style={styles.sectionTitle}>Detaylı Kayıtlar ({filteredRecords.length})</Text>
         {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
               <View key={index} style={styles.recordItem}>
               <Text style={styles.recordDate}>{formatDate(record.date)}</Text>
               <View style={[styles.statusBadge, getStatusStyle(record.status)]}>
                   <Text style={styles.statusText}>{getStatusText(record.status)}</Text>
               </View>
               </View>
            ))
         ) : (
            allRecords.length > 0 ?
             <Text style={styles.noDataText}>Seçili tarih aralığında yoklama kaydı bulunamadı.</Text> :
             <Text style={styles.noDataText}>Bu ders için henüz yoklama kaydı girilmemiş.</Text>
         )}
      </View>
    </ScrollView>
  );
};

// Stiller - statusExcused kaldırıldı
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Geri butonu eklenince güncellendi
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: { // Geri butonu stili
      padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // Ortalamak için flex: 1 ve textAlign: 'center' de kullanılabilir,
    // ama sağdaki boşluk ile de dengelenebilir.
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#eef',
    borderRadius: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  chartSection: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    alignItems: 'center',
  },
   listSection: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
   recordDate: {
    fontSize: 15,
    color: '#555',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusPresent: {
    backgroundColor: '#4CAF50', // Yeşil
  },
  statusAbsent: {
    backgroundColor: '#F44336', // Kırmızı
  },
  // statusExcused: { // Bu stil kaldırıldı
  //   backgroundColor: '#FFC107', // Sarı
  // },
   noDataText: {
     textAlign: 'center',
     marginTop: 20,
     fontSize: 15,
     color: '#777',
   }
});

export default StudentCourseAttendanceDetail;