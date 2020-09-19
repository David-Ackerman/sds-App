import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Play_400Regular,
  Play_700Bold,
} from '@expo-google-fonts/play';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Routes />
        <StatusBar style="light" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
