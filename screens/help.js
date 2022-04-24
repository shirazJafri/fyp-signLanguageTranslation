import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';
import LinearGradient from 'react-native-linear-gradient';
import Gradient from 'react-native-css-gradient';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
// import SpeechToText from 'react-native-google-speech-to-text';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Feather';

// TODO: What to do with the module?

const Help = ({ navigation }) => {





    return (
        <LinearGradient
            colors={['#00ced1', '#66cdaa', `#20b2aa`, '#afeeee']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.container}>


                <SafeAreaView>


                    <View style={styles.iconContainer2}>

                        <Icon2 name="help-circle" size={80} color='white' />
                        <Text style={styles.headingText}>How To Use</Text>
                    </View>
                    <View

                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            padding: 8
                        }}
                    />

                    <View style={styles.iconContainer}>

                        <Icon name="arrow-right" size={35} color='#008080' />
                        <Text style={styles.text1}> Speak/type the text in textbar.</Text>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                        }}
                    />


                    <View style={styles.iconContainer}>

                        <Icon name="arrow-right" size={35} color='#008080' />
                        <Text style={styles.text1}> Press the Translate button. </Text>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }}
                    />




                    <View style={styles.iconContainer}>

                        <Icon name="arrow-right" size={35} color='#008080' />
                        <Text style={styles.text1}> Give few moments for translation. </Text>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }}
                    />


                    <View style={styles.iconContainer}>

                        <Icon name="arrow-right" size={35} color='#008080' />
                        <Text style={styles.text1}> Translated video plays sign gestures. </Text>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }}
                    />

                    <View style={styles.iconContainer}>

                        <Icon name="arrow-right" size={35} color='#008080' />
                        <Text style={styles.text1}> Use clear button to remove text. </Text>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }}
                    />


                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            marginTop: 24,
                            justifyContent: 'center',
                            borderColor: 'white',
                            width: 100,
                            height: 50,
                            backgroundColor: '#008080',
                            padding: 8,
                            borderRadius: 50
                        }}
                        onPress={
                            () => navigation.navigate('Audio_Record')
                        }
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>Back</Text>
                    </TouchableOpacity>




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
        fontSize: 26,
        marginTop: 16,
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Roboto',
        paddingTop: 4,
        paddingBottom: 4
    },
    text1: {
        alignItems: 'flex-start',
        fontSize: 20,
        color: 'white',
        fontFamily: 'Roboto'
    },
    iconContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
        textAlign: 'center',
        flexDirection: "row",

    },
    iconContainer2: {
        paddingTop: 80,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center',
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

export default Help;