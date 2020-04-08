/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import SearchScreen from './src/components/SearchScreen';
import {Button, Title, Icon} from 'native-base';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({
                    headerStyle: {
                        backgroundColor: '#235aaa',
                    },
                    headerTitle: <Title> Kërkoni për një këngë</Title>,
                    headerRight: () => (
                        <Button transparent
                                onPress={() => navigation.navigate('Search')}
                        >
                            <Icon name='search' style={{color: '#fff'}}/>
                        </Button>
                    ),
                })}/>
                <Stack.Screen name="Search" component={SearchScreen} options={({navigation}) => {
                    return {
                        headerStyle: {
                            backgroundColor: '#214786',
                        },
                        headerTitle: <Title> Kërkesa e këngës</Title>,
                    };
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
