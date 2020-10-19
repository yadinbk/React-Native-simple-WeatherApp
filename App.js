import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'

import WeatherInfo from './app/components/WeatherInfo'
import UnitsPicker from './app/components/UnitsPicker'
import WeatherDetail from './app/components/WeatherDetail'

import { colors } from './app/utils/index'
import RefreshButton from './app/components/RefreshButton';

const WEATHER_API_KEY = '70f5e103b5c9adca1791064dd599a651'
const WEATHER_API_KEY2 = '2144250dcca73e7b3cae9f287209d67e'
const WEATHER_API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [units, setUnits] = useState('metric')

  useEffect(() => { load() }, [units])

  async function load() {

    setCurrentWeather(null)
    setErrorMessage(null)

    try {
      let { granted } = await Location.requestPermissionsAsync()
      if (!granted) {
        setErrorMessage("Acsses to location needed for run the app")
        alert(errorMessage)
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      const weatherUrl = `${WEATHER_API_BASE_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result = await response.json()
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(response.errorMessage)
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar styles="auto" />
        <View style={styles.main}>
          <View style={{ flex: 1, position: 'absolute', top: 40, right: 30 }}>
            <RefreshButton load={load} />
          </View>
          <WeatherInfo currentWeather={currentWeather} />
          <UnitsPicker units={units} setUnits={setUnits} />
        </View>
        <WeatherDetail currentWeather={currentWeather} units={units} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>
          {errorMessage}
        </Text>
        <StatusBar styles="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar styles="auto" />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
