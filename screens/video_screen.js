import React, { useState, useEffect, Component } from 'react';
import VideoPlayer from "react-native-multiple-video-player"
import { LogBox } from 'react-native'
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import Video from 'react-native-video';
import YoutubePlayer from "react-native-youtube-iframe";
import { useDimensions } from '@react-native-community/hooks'
import Orientation from 'react-native-orientation-locker'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { Dimensions } from 'react-native';

LogBox.ignoreAllLogs(true)

const DATA = [
  {
    uri: "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4",
    title: "Elephant Dream"
  },
  {
    uri: "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4",
    title: "For Bigger Blazes"
  },
]
const vid = "screens/t.mp4"

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


const Video_screen = ({ navigation, route }) => {
  const windowWidth = useDimensions().screen.width
  const windowHeight = useDimensions().screen.height
  const [playerViewStyle, setPlayerViewStyle] = useState({})
  const [playerWidth, setPlayerWidth] = useState(0)
  const [playerHeight, setPlayerHeight] = useState(0)
  const [videoLoading, setVideoLoading] = useState(false)

  let playerFullScreen = true
  /** Change the layout when the player goes fullscreen */
  useEffect(() => {

    // constants
    const boxedViewStyle = {
      position: 'absolute',
      right: 0,
      left: 0,
      zIndex: 1,
    }

    const fullscreenViewStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: 2,
    }

    // Do the magic trick to change everything
    if (playerFullScreen) {
      Orientation.lockToLandscape() // View horizontal
      setPlayerViewStyle(fullscreenViewStyle)
      setPlayerWidth(windowWidth)
      setPlayerHeight(windowHeight)
    } else {
      Orientation.lockToPortrait() // View
      setPlayerViewStyle(boxedViewStyle)
      setPlayerWidth(windowWidth)
      setPlayerHeight(PixelRatio.roundToNearestPixel(windowWidth / (16 / 9)))
    }

    return () => {
      Orientation.lockToPortrait()
    }

  }, [playerFullScreen, windowHeight, windowWidth])
  return (

    <View style={styles.container} pointerEvents='none'>
      {playerFullScreen && <StatusBar hidden={true} />}
      {videoLoading==true && <ActivityIndicator style={{ padding: 20, width: screenHeight, height: screenWidth, alignSelf: 'center' }} size="large" color="#008080" />}
      <Video source={{ uri: route.params.res }}   // Can be a URL or a local file.
        // Callback when video cannot be loaded
        style={styles.video} resizeMode="cover"
        onLoadStart={() => setVideoLoading(true)}
        onReadyForDisplay = {() => setVideoLoading(false)}
        onEnd={() => navigation.navigate('Audio_Record')}
      />
      {/* <Text>{route.params.res}</Text> */}
    </View>)
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  video: {
    alignSelf: 'center',
    width: screenHeight - 150,
    height: screenWidth + 100,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Video_screen;