import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Login from './src/Screens/Login';
import MainTab from './src/Screens/MainTab';
import Settings from './src/Screens/Settings';
import GetDataScreen from './src/Screens/GetDataScreen';
import Menus from "./src/Screens/Menu"
import GetDataInput from './src/components/GetDataInput';
import Veri from './src/Screens/Veri';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //behavior={'height'}
        style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            //initialRouteName='Main' 
            initialRouteName='Main'

          >


            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GetData"
              component={GetDataScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Menu"
              component={Menus}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={MainTab}
              options={{ headerShown: false }}
            />

            
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />

             <Stack.Screen
              name="Veri"
              component={Veri}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        </NavigationContainer>




        </KeyboardAvoidingView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",

  },
});
