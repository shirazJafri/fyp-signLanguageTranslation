import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import SpeechToText from 'react-native-google-speech-to-text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

// TODO: What to do with the module?

const Audio_record = ({ navigation }) => {

  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isTranslateLoading, setTranslateLoading] = useState(false)
  const [isEmptyAlert, setEmptyAlert] = useState(false);
  const [isInvalidAlert, setInvalidAlert] = useState(false);
  const [isErrorAlert, setErrorAlert] = useState(false);

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
  const clear = () => {
    setResult("")
  }

  const translate = (transcription) => {
    if (transcription) {
      setTranslateLoading(true)

      axios.post('http://1ff9-182-255-48-81.ngrok.io/api/fixSentence', {
        sentence: transcription
      })

        .then(function (response) {
          setTranslateLoading(false)
          if (response.data.status == 'success') {
            clear();
            navigation.navigate('Video_Screen', { res: response.data.data.file_path })
          }
          else {
            // Alert.alert(
            //   "Invalid Text",
            //   "Do you wanna start over?",
            //   [
            //     {
            //       text: "Cancel",
            //       onPress: () => console.log("Cancel Pressed"),
            //       style: "cancel"
            //     },
            //     { text: "OK", onPress: () => clear() }
            //   ]
            // );
            setInvalidAlert(true)
          }
        })

        .catch(function (error) {
          setTranslateLoading(false)
          // Alert.alert(
          //   "Oops...",
          //   "Something went wrong. Try again at a better time!",
          //   [
          //     { text: "OK" }
          //   ]
          // );
          setErrorAlert(true)
          console.log(error)
        })
    }
    else {
      // Alert.alert(
      //   "Empty Text",
      //   "Give us something to work with!",
      //   [
      //     { text: "Ok"}
      //   ]
      // );
      setEmptyAlert(true)
    }
  }

  const handleInvalidConfirm = () => {
    clear();
    setInvalidAlert(false);
  }


  return (
    <LinearGradient
      colors={['#00ced1', '#66cdaa', `#20b2aa`, '#afeeee', '#7fffd4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.headingText}></Text>
          {/* <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginTop: 24,
              justifyContent: 'center',
              borderColor: 'white',
              width: 32,
              height: 32,
              backgroundColor: 'white',
              padding: 8,
              marginBottom: 18,
              borderRadius: 50,
              borderWidth: 1
            }}
            onPress={
              () => navigation.navigate('Help')
            }
          >
            <View style={styles.iconContainer}><Icon name="info" size={14} color='#008080' /></View>
          </TouchableOpacity> */}
          <View style={styles.textInputStyle}>
            <TextInput
              value={result}
              placeholder="Enter your text or record it."
              style={{ width: 250, maxHeight: 300 }}
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

          {/* <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 24,
              justifyContent: 'center',
              borderColor: 'white',
              width: 120,
              height: 50,
              backgroundColor: '#40e0d0',
              padding: 8,
              borderRadius: 50
            }}
            onPress={clear}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Clear</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 24,
              justifyContent: 'center',
              borderColor: 'white',
              width: 120,
              height: 50,
              backgroundColor: '#40e0d0',
              padding: 8,
              borderRadius: 50
            }}
            onPress={
              () => translate(result)
            }
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Translate</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            justifyContent: 'center',
            borderColor: 'white',
            width: 120,
            height: 50,
            backgroundColor: '#008080',
            padding: 8,
            marginBottom: 200,
            borderRadius: 50
          }}
          onPress={
            () => translate(result)
          }
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Translate</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginTop: 35,
            justifyContent: 'center',
            borderColor: 'white',
            width: 32,
            height: 32,
            backgroundColor: 'white',
            borderRadius: 50,
            borderWidth: 1
          }}
          onPress={
            () => navigation.navigate('Help')
          }
        >

         <View style={styles.iconContainer}><Icon name="question" size={14} color = '#008080' /></View>   
          </TouchableOpacity>

          {isTranslateLoading == true && <ActivityIndicator style={{ width: 100, height: 100, alignSelf: 'center' }} size="large" color="#008080" />}


          <AwesomeAlert
            show={isEmptyAlert}
            showProgress={false}
            title="Empty Text!"
            message="Give us something to work with!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Sure!"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setEmptyAlert(false)
            }}
          />

          <AwesomeAlert
            show={isInvalidAlert}
            showProgress={false}
            title="Invalid Text!"
            message="Do you wanna start over?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText="Sure!"
            cancelText='Cancel'
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              handleInvalidConfirm()
            }}
            onCancelPressed={() => {
              setInvalidAlert(false);
            }}
          />

          <AwesomeAlert
            show={isErrorAlert}
            showProgress={false}
            title="Oops..."
            message="Something went wrong. Try again at a better time!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText="Ok"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setErrorAlert(false)
            }}
          />
        </SafeAreaView>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontSize: 26,
    color: '#2f4f4f',
    textAlign: 'left',
    fontFamily: 'Roboto',
    paddingTop: 14
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
    shadowOpacity: 0.4,
    marginTop: 30
  },
  iconContainer: {
    alignItems: 'flex-start',
    textAlign: 'center',
    flexDirection: "row",
    alignSelf: 'center'

  },
});

export default Audio_record;