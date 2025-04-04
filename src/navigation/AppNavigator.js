import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Auth Screens
import AuthPage from '../screens/auth/AuthPage';
import StudentLogin from '../screens/auth/StudentLogin';
import StudentRegister from '../screens/auth/StudentRegister';
import AcademicianRegister from '../screens/auth/AcademicianRegister';
import ForgotPassword from '../screens/auth/ForgotPassword';

// Student Screens
import StudentProfile from '../screens/student/StudentProfile';
import Attendance from '../screens/student/Attendance';
import CourseDetail from '../screens/student/CourseDetail';
import Schedule from '../screens/student/Schedule';
import Performance from '../screens/student/Performance';

// Academician Screens
import AcademicianProfile from '../screens/academician/AcademicianProfile';
import TakeAttendance from '../screens/academician/TakeAttendance';
import CourseManagement from '../screens/academician/CourseManagement';
import StudentList from '../screens/academician/StudentList';
import Reports from '../screens/academician/Reports';

// Settings Screen
import Settings from '../screens/settings/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Öğrenci için Bottom Tab Navigator
const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AttendanceTab') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (route.name === 'ScheduleTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'PerformanceTab') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Profile" 
        component={StudentProfile} 
        options={{ title: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="AttendanceTab" 
        component={Attendance} 
        options={{ title: 'Yoklama' }}
      />
      <Tab.Screen 
        name="ScheduleTab" 
        component={Schedule} 
        options={{ title: 'Program' }}
      />
      <Tab.Screen 
        name="PerformanceTab" 
        component={Performance} 
        options={{ title: 'Performans' }}
      />
    </Tab.Navigator>
  );
};

// Akademisyen için Bottom Tab Navigator
const AcademicianTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'AcademicianHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TakeAttendanceTab') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'StudentsTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'ReportsTab') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="AcademicianHome" 
        component={AcademicianProfile} 
        options={{ title: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="TakeAttendanceTab" 
        component={TakeAttendance} 
        options={{ title: 'Yoklama Al' }}
      />
      <Tab.Screen 
        name="StudentsTab" 
        component={StudentList} 
        options={{ title: 'Öğrenciler' }}
      />
      <Tab.Screen 
        name="ReportsTab" 
        component={Reports} 
        options={{ title: 'Raporlar' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="StudentRegister" component={StudentRegister} />
        <Stack.Screen name="AcademicianRegister" component={AcademicianRegister} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        
        {/* Student Stack */}
        <Stack.Screen name="StudentProfile" component={StudentTabNavigator} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Performance" component={Performance} />
        
        {/* Academician Stack */}
        <Stack.Screen name="AcademicianProfile" component={AcademicianTabNavigator} />
        <Stack.Screen name="TakeAttendance" component={TakeAttendance} />
        <Stack.Screen name="CourseManagement" component={CourseManagement} />
        <Stack.Screen name="StudentList" component={StudentList} />
        <Stack.Screen name="Reports" component={Reports} />
        
        {/* Settings */}
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 