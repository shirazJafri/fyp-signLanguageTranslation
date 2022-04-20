import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';
// import SpeechToText from 'react-native-google-speech-to-text';

// TODO: What to do with the module?

const Audio_record = ({navigation}) => {

  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isTranslateLoading, setTranslateLoading] = useState(false)
  
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])
//   const speechToTextHandler = async () => {

//     let speechToTextData = null;
//         try {
//             speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
//             console.log('speechToTextData: ', speechToTextData);
//             setResult(text)

//         } catch (error) {
//             console.log('error: ', error);
//         }
// }
  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      setLoading(false)
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }
  const clear = () =>{
    setResult("")
  }

  translate = async (transcription) => {
    setTranslateLoading(true)
    await axios.post('http://98fd-182-255-48-81.ngrok.io/api/fixSentence', {
      'sentence': transcription
    })

    .then(function (response) {
      console.log(response.data)
      if(response.data.status == 'success') {
        setTranslateLoading(false)
        console.log(response)
        navigation.navigate('Video_Screen', {res:response.data.data.file_path})
      }
    })

    .catch(function(error) {
      setTranslateLoading(false)
      console.log(error)
    })
  } 


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Sign Language Translator</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="Enter your text or record it."
            style={{width:250, maxHeight: 300}}
            multiline
            onChangeText={text => setResult(text)}
          />
          {isLoading ? <ActivityIndicator size="large" color="red" />

            :
            
            <TouchableOpacity
              onPress={startRecording}
            >
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4
          }}
          onPress={clear}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4
          }}
          onPress={() => translate(result)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Translate</Text>
          </TouchableOpacity>
          {isTranslateLoading == true && <ActivityIndicator size="large" color="red" />}
      </SafeAreaView>
    </View>
  );
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
    maxheight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});

export default Audio_record;