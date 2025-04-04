import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

export default function Performance() {
  const performanceData = {
    totalClasses: 20,
    attendedClasses: 15,
    attendanceRate: (15 / 20) * 100,
    courseAttendance: [
      { course: 'Matematik', attended: 8, total: 10 },
      { course: 'Fizik', attended: 3, total: 5 },
      { course: 'Programlama', attended: 4, total: 5 },
    ],
    weeklyAttendance: [
      { week: 'Hafta 1', rate: 100 },
      { week: 'Hafta 2', rate: 75 },
      { week: 'Hafta 3', rate: 100 },
      { week: 'Hafta 4', rate: 50 },
      { week: 'Hafta 5', rate: 75 },
    ],
  };

  // Haftalık katılım grafiği verisi
  const lineChartData = {
    labels: performanceData.weeklyAttendance.map((item) => item.week),
    datasets: [
      {
        data: performanceData.weeklyAttendance.map((item) => item.rate),
      },
    ],
  };

  // Derslere göre katılım grafiği verisi
  const barChartData = {
    labels: performanceData.courseAttendance.map((item) => item.course),
    datasets: [
      {
        data: performanceData.courseAttendance.map(
          (item) => (item.attended / item.total) * 100
        ),
      },
    ],
  };

  // Genel katılım oranı (Pie Chart için)
  const pieChartData = [
    {
      name: 'Katılım',
      population: performanceData.attendanceRate,
      color: '#007bff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Devamsızlık',
      population: 100 - performanceData.attendanceRate,
      color: '#ff6b6b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  // Grafik yapılandırması
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#007bff',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Performans Analizi</Text>

      {/* Genel Durum Kartı */}
      <Surface style={styles.card}>
        <Text style={styles.cardTitle}>Genel Durum</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={28} color="#007bff" />
            <Text style={styles.statValue}>{performanceData.totalClasses}</Text>
            <Text style={styles.statLabel}>Toplam Ders</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={28} color="#28a745" />
            <Text style={styles.statValue}>{performanceData.attendedClasses}</Text>
            <Text style={styles.statLabel}>Katıldığı Ders</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="analytics" size={28} color="#fd7e14" />
            <Text style={styles.statValue}>
              {performanceData.attendanceRate.toFixed(0)}%
            </Text>
            <Text style={styles.statLabel}>Katılım Oranı</Text>
          </View>
        </View>
      </Surface>

      {/* Genel Katılım Oranı (Pie Chart) */}
      <Surface style={styles.card}>
        <Text style={styles.cardTitle}>Genel Katılım Oranı</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieChartData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </Surface>

      {/* Haftalık Katılım Grafiği (Line Chart) */}
      <Surface style={styles.card}>
        <Text style={styles.cardTitle}>Haftalık Katılım Performansı</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={lineChartData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </Surface>

      {/* Derslere Göre Katılım (Bar Chart) */}
      <Surface style={styles.card}>
        <Text style={styles.cardTitle}>Derslere Göre Katılım Oranı (%)</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={barChartData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            showValuesOnTopOfBars
          />
        </View>
      </Surface>

      {/* Rapor İndirme Butonu */}
      <Button
        mode="contained"
        icon="file-download"
        style={styles.reportButton}
        onPress={() => alert('Performans raporu indiriliyor...')}
      >
        Performans Raporu İndir
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  reportButton: {
    marginVertical: 20,
    backgroundColor: '#007bff',
    paddingVertical: 8,
  },
});
