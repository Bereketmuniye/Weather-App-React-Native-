import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { API_KEY } from './assets/config/config';
import { FontAwesome } from 'react-native-vector-icons';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (cityName) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData('Addis Ababa'); 
  }, []);

  const handleInputChange = (text) => {
    setCity(text);
  };

  const handleSubmit = () => {
    if (!city) {
      alert('Please enter a city name');
      return; // Handle empty city input
    }
    fetchWeatherData(city);
  };

  return (
    <View style={styles.container}>
    <View style={styles.contaners}>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={handleInputChange}
        placeholder="Enter City Name"
      />
     <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
     <FontAwesome name="search" size={24} color="#fff" />
     </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('./assets/download.png')} style={styles.image} />
      </View>
      {weatherData && (
      <View style={styles.containee}>
          <Text style={styles.text}>City: {weatherData.name}</Text>
          <Text style={styles.text}>Weather: {weatherData.weather[0].main}</Text>
          <Text style={styles.text}>Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C</Text>
        </View>
         )}
            <View style={styles.other}>
            <Text style={styles.texts} >welcome to this weathe app</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  padding: 20,
  backgroundColor: '#8A2BE2',
  height:200,
  borderBottomLeftRadius:50,
  borderBottomRightRadius:50,

},
contaners:
{
   display: 'flex',
   flexDirection: 'row',
},
  input: {
    height: 40,
    marginTop: 80,
    padding: 10,
    fontSize: 16,
    backgroundColor:'#fff',
    width:340,
  },
  text: {
    fontSize: 30,
    marginBottom: 10,
    textAlign:'center',
  },
  btn:
  {
    height: 40,
    marginTop: 85,
    marginLeft:5,
  },
 iconContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor:'#2F4F4F',
    marginTop:100,
  },
  containee:
  {
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#1E90FF',
    height:200,
    marginLeft:0,
    marginRight:0,

  },
  other:
  {
    marginBottom:0,
    backgroundColor:'#8A2BE2',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    height:550,
    margin:5,
    marginLeft:0,
    marginRight:0,

  },
  texts:
  {
    fontSize:'bolder',
    margin:10,

  }
});

export default WeatherApp;
















