import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const SplashScreen = () => {
  return (
    <View style={styles.container}>
    <View style={styles.bg}/>
      <Image style={styles.logo} source={require("../assets/Logo.png")}/>
      <LottieView style={styles.loading} source={require("../assets/loadingjson.json")}
      autoPlay
      loop
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
        marginBottom: -150,
    },
    loading: {
        width: 150,
        height: 150,
    },
    bg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'grey',
        opacity: 0.2
    }
});

export default SplashScreen