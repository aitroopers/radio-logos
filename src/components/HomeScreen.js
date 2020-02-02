/**
 * Created by rocky on 2/14/18.
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
     TextInput
} from 'react-native';
import { ReactNativeAudioStreaming, Player } from '../../react-native-audio-streaming';
import { Container, Header, Input, Right, Button, Icon, Title, Footer,Item} from 'native-base';
import Fab from './Fab'
import CurrentPlaylist from "./CurrentPlaylist";

export default class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: '#3287f4',
            },
            headerTitle: <Title>  Home</Title>,
            headerRight: (
                <Button transparent
                    onPress={() => navigation.navigate('Search')}
                >
                    <Icon name='search' style={{color:'#fff'}}/>
                </Button>
            ),
        };
    };

    constructor(){
        super();
        this.state ={
            searchText: 'search a song',
        }
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../img/background.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={{flex: 1}}>
                        <Image source={require('../img/logo.png')} style={{width: '100%', flex: 1}}/>
                    </View>
                    <Fab/>
                    <CurrentPlaylist/>
                    <Footer>
                        <Player url={'http://s2.stationplaylist.com:9280/listen.aac?type=.flv?1518105850046.aac'}/>
                    </Footer>
                </ImageBackground>
            </Container>
        );
    }
}
