import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// import Voice from '@react-native-voice/voice';
import Audio_record from './screens/audio_record';
// import SpeechToText from 'react-native-google-speech-to-text';
import Video_screen from './screens/video_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TODO: What to do with the module?
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Audio_Record"
          component = {Audio_record}
          options={{title:"                          SUNO", headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          ,
        }}
        />
        <Stack.Screen name = "Video_Screen" component = {Video_screen}
        options={{title:"", headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
        />
      </Stack.Navigator>
    </NavigationContainer>  
  )
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});

export default App;