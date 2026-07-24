import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/heavy-rain.png";
import humidityIcon from "../assets/humidity.png";
import snowIcon from "../assets/snow.png";
import sunIcon from "../assets/sun.png";
import windIcon from "../assets/wind.png";
import thunderIcon from "../assets/thunderstorm.png";
import fewCloudIcon from "../assets/few-cloud.png";
import brokenCloudIcon from "../assets/broken-cloud.png";
import logo from "@/assets/images/icon.png";

import { LinearGradient } from "expo-linear-gradient";
import { Linking, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";

function Weather() {
  const [weatherData, setweatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    icon: sunIcon,
  });
  const [city, setCity] = useState("");
  const allIcons = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": fewCloudIcon,
    "02n": fewCloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": brokenCloudIcon,
    "04n": brokenCloudIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": drizzleIcon,
    "10n": drizzleIcon,
    "11d": thunderIcon,
    "11n": thunderIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  useEffect(() => {
    search("Ghana");
  }, []);

  const search = async (city) => {
    if (!city.trim()) {
      Alert.alert("Enter City Name");
      return;
    }
    Keyboard.dismiss();

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        Alert.alert(data.message);
        return;
      }
      console.log(data);

      const icon = allIcons?.[data?.weather?.[0]?.icon] || sunIcon;

      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      setweatherData({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: "",
        icon: sunIcon,
        description: "",
      });

      Alert.alert("Error in fetching Weather Data");
    }
  };

  return (
    <LinearGradient colors={["#1e3c72", "#325798"]} style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.appTitle}>Weatherly </Text>
      </View>
      <ScrollView>
        <View style={styles.weatherContainer}>
          <View style={styles.searchBar}>
            <TextInput
              value={city}
              onChangeText={setCity}
              onSubmitEditing={() => search(city)}
              placeholder="Search city..."
              placeholderTextColor="#ccc"
              returnKeyType="search"
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={() => search(city)}>
              <View style={styles.searchButton}>
                <Image source={searchIcon} style={styles.searchIcon} />
              </View>
            </TouchableOpacity>
          </View>
          {weatherData && (
            <>
              <View style={styles.weatherCard}>
                <Image source={weatherData.icon} style={styles.weatherIcon} />
                <Text style={styles.temperature}>
                  {weatherData.temperature}°c
                </Text>
                <Text style={styles.location}>{weatherData.location}</Text>
                <Text style={styles.description}>
                  {weatherData.description}
                </Text>
                <View style={styles.weatherData}>
                  <View style={styles.col}>
                    <Image
                      source={humidityIcon}
                      style={styles.weatherAppIcon}
                    />
                    <View>
                      <Text style={styles.weatherDataText}>
                        {weatherData.humidity} %
                      </Text>
                      <Text style={styles.weatherDataLabel}>Humidity</Text>
                    </View>
                  </View>
                  <View style={styles.col}>
                    <Image source={windIcon} style={styles.weatherAppIcon} />
                    <View>
                      <Text style={styles.weatherDataText}>
                        {weatherData.windSpeed} Km/h
                      </Text>
                      <Text style={styles.weatherDataLabel}>Wind Speed</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.infoBanner}>
                <Text style={styles.infoIcon}>ℹ️</Text>

                <Text style={styles.infoText}>
                  Current weather data for the selected city.
                </Text>
              </View>
              <View>
                <Text style={styles.developedByText}>
                  Developed by{" "}
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL("https://github.com/owiamusic")
                    }
                  >
                    Ashtel Hub
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.poweredByText}>
                  Powered by OpenWeatherMap
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  weatherCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 50,
  },
  appTitle: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  weatherDataText: {
    color: "#fff",
    marginTop: 4,
    fontSize: 15,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 30,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    color: "#000",
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 16,
  },
  searchIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  searchButton: {
    padding: 20,
    borderRadius: 40,
  },
  weatherDataLabel: {
    fontSize: 15,
    color: "#fff",
  },
  weatherAppIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  weatherIcon: {
    width: 120,
    height: 120,
    margin: 10,
  },
  weatherData: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  location: {
    color: "#fff",
    fontSize: 22,
    marginTop: 5,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
    fontStyle: "italic",
  },
  temperature: {
    color: "#fff",
    fontSize: 54,
    fontWeight: "bold",
  },
  col: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#173161",
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1E",
    paddingVertical: 10,
  },
  poweredByText: {
    color: "#fff",
    fontSize: 10,
  },
  developedByText: {
    color: "#fff",
    padding: 10,
  },
  link: {
    color: "#f9cf00",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFF4CC",
    borderLeftWidth: 4,
    borderLeftColor: "#F4B400",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  infoIcon: {
    fontSize: 15,
    marginRight: 5,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#5C4B00",
    lineHeight: 20,
    textAlign: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
