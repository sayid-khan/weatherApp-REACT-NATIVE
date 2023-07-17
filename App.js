import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Search from './components/Search';
import Weather from './components/Weather';

const API_KEY ="9e144ba509bbf1b1531a7a80992e67f0"
export default function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loaded, setLoaded] = useState(true)
  
  async function fetchWeatherData(cityName){
    setLoaded(false) //means its loading 
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try{
      const response = await fetch(API)
      if(response.status==200){
        const data = await response.json()
        setWeatherData(data)
      }
      else{
        setWeatherData(null)
      }
      setLoaded(true)
    }
      catch(error){
        console.log(error);
      }
  }

  useEffect(() => {
    fetchWeatherData('Srinagar')
    // console.log(weatherData)
  }, [])
  
  if(!loaded){
    return(
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36}/>
      </View>
    )
  }

  else if(weatherData===null){
    return(
      <View>
        <Search fetchWeatherData={fetchWeatherData}/>
        <Text style={{margin:20,fontSize:28}}>City Not Found! Try Different City</Text>
      </View>
    )
  
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
