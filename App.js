
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground
} from 'react-native';
import HomeScreen from './src/components/HomeScreen'
import SearchScreen from './src/components/SearchScreen'
import {
  StackNavigator,
} from 'react-navigation';


const App = StackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
});


export default App;