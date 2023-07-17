import { ImageBackground, StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/index"


export default function Weather({weatherData,fetchWeatherData}) {
    const [backgroundImage,setBackgroundImage]= useState(null)


    const { weather,
        name,
        main: { temp, humidity },
        wind: { speed }
    } = weatherData;
    const [{ main }] = weather;  // we are destructuring that is we are getting main from weather


    useEffect(() => {
      setBackgroundImage(getBackgroundImg(main))
    }, [weatherData])
    

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }


    return (
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImg} resizeMode="cover">
            <Search fetchWeatherData={fetchWeatherData}/>
            <View style={{alignItems:"center"}}>
                <Text style={{ fontSize: 36,marginTop: 20, fontWeight:"700"}}>{name}</Text>
                <Text style={{ fontSize: 30,marginTop: 10,fontWeight:"500"}}>{main}</Text>
                <Text style={{ fontSize: 22,marginTop: 10,fontWeight:"500"}}>{temp} ºC</Text>
            </View>

            <View style={styles.extraInfo}>
            <View style={styles.info}>
                <Text style={{ fontSize: 22,fontWeight:"500"}}>Humidity</Text>
                <Text style={{ fontSize: 22,fontWeight:"500"}}>{humidity}%</Text>
            </View>

            <View style={styles.info}>
                <Text style={{ fontSize: 22,fontWeight:"500"}}>Wind Speed</Text>
                <Text style={{ fontSize: 22,fontWeight:"500"}}>{speed} m/s</Text>
            </View>
            </View>
          </ImageBackground>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(166,142,243, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems:"center"
    }
});