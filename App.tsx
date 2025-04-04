import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthPage from "./src/screens/auth/AuthPage";
import StudentProfile from "./src/screens/student/StudentProfile";
import StudentRegister from "./src/screens/student/StudentRegister";
import AcademicianRegister from "./src/screens/academician/AcademicianRegister";
import AcademicianProfile from "./src/screens/academician/AcademicianProfile";
import ForgotPassword from "./src/screens/auth/ForgotPassword";
import Attendance from "./src/screens/student/Attendance";
import Performance from "./src/screens/student/Performance";
import Schedule from "./src/screens/student/Schedule";
import StudentAttendance from "./src/screens/academician/StudentAttendance";
import TakeAttendance from "./src/screens/academician/TakeAttendance";
import StudentList from "./src/screens/academician/StudentList";
import Reports from "./src/screens/academician/Reports";
import AttendanceDetails from "./src/screens/academician/AttendanceDetails";
import AcademicSettings from  "./src/screens/academician/AcademicSettings";
import EditProfile from "./src/screens/student/EditProfile";
import CourseDetails from "./src/screens/academician/CourseDetails";

type RootStackParamList = {
  Auth: undefined;
  StudentProfile: undefined;
  StudentRegister: undefined;
  AcademicianRegister: undefined;
  AcademicianProfile:undefined;
  ForgotPassword: undefined
  Attendance: undefined;
  Schedule: undefined;
  Performance: undefined;
  StudentAttendance: undefined;
  TakeAttendance: undefined;
  StudentList: undefined;
  Reports: undefined;
  AttendanceDetails: undefined;
  AcademicSettings: undefined;
  EditProfile:undefined;
  CourseDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthPage} options={{ title: "İÜC" }} />
        <Stack.Screen name="StudentProfile" component={StudentProfile} options={{ title: "Öğrenci Profili" }} />
        <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ title: "Öğrenci Kaydı" }} />
        <Stack.Screen name="AcademicianProfile" component={AcademicianProfile} options={{ title: "Akademisyen Profili" }} />
        <Stack.Screen name="AcademicianRegister" component={AcademicianRegister} options= {{title: "Akademisyen Kaydı"}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options= {{title: "Şifremi Unuttum"}} />
        <Stack.Screen name="Attendance" component={Attendance} options= {{title: "Yoklama Durumu"}} />
        <Stack.Screen name="Performance" component={Performance} options= {{title: "Performans"}} />
        <Stack.Screen name="Schedule" component={Schedule} options= {{title: "Ders Programı"}} />
        <Stack.Screen name="StudentAttendance" component={StudentAttendance} options= {{title: "Öğrenci Yoklama"}} />
        <Stack.Screen name="TakeAttendance" component={TakeAttendance} options= {{title: "Yoklama Al"}} />
        <Stack.Screen name="StudentList" component={StudentList} options= {{title: "Öğrenci Listesi"}} />
        <Stack.Screen name="Reports" component={Reports} options= {{title: "Raporlar"}} />
        <Stack.Screen name="AttendanceDetails" component={AttendanceDetails} options= {{title: "Yoklama Detayı"}} />
        <Stack.Screen name="AcademicSettings" component={AcademicSettings} options= {{title: "Ayarlar"}} />
        <Stack.Screen name="EditProfile" component={EditProfile} options= {{title: "Profili Düzenle"}} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} options= {{title: "Ders Detayları"}} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
