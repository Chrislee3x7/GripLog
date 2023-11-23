import { StatusBar } from 'expo-status-bar';
import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import GripLog from './Components/GripLog';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: "#f2f2f2",
    card: "#e7e0ec"
  },
};

export default function App() {
  // style is needed in GestureHandlerRootView, or screen goes blank
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
          <GripLog/>
      </PaperProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
