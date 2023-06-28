import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Styles from "./styles/styles1";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import { EventEmitter } from "eventemitter3";
import Immersive from 'react-native-immersive';


const Stack = createStackNavigator();
export const eventEmitter = new EventEmitter();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // const DATAUSER =
  //ESCUCHA PARA LOGIN
  eventEmitter.on("login", () => {
    setLoggedIn(true);
  });
  //ESCUCHA PARA LOGOUT
  eventEmitter.on("logout", () => {
    setLoggedIn(false);
  });



  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
