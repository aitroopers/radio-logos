import React, {Component, useEffect} from 'react';
import {Text, View, ImageBackground, Image, StyleSheet} from 'react-native';
import Fab from './Fab';
import {Container, Header, Input, Right, Button, Icon, Title, Footer, Item} from 'native-base';
import CurrentPlaylist from './CurrentPlaylist';
import MusicPlayer from './MusicPlayer';
import * as TrackPlayer from 'react-native-track-player';
import {useTrackPlayerEvents, usePlaybackState, useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {choose} from '../utils/utils';

const imgs = [
    require('../img/bg1.jpg'), require('../img/bg2.jpg'), require('../img/bg3.jpg'), require('../img/bg4.jpg'),
];
const img = choose(imgs);


function HomeScreen() {
    const playbackState = usePlaybackState();

    useEffect(() => {

        TrackPlayer.setupPlayer({
            backgroundService: () => require('./service.js')

        }).then(async () => {

            await TrackPlayer.add({
                id: 'trackId',
                url: 'http://s2.stationplaylist.com:9280/listen.aac?type=.flv?1518105850046.aac',
                // artwork: require('track.png'),
            });
            TrackPlayer.play();
        });

        TrackPlayer.registerPlaybackService(() => require('./service.js'));
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
        });
    }, []);


    async function togglePlayback() {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: 'local-track',
                uri: 'http://s2.stationplaylist.com:9280/listen.aac?type=.flv?1518105850046.aac',
            });
            await TrackPlayer.play();
        } else {
            if (playbackState === TrackPlayer.STATE_PAUSED) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }



    return (
         <Container>
            <ImageBackground source={require('../img/background.jpg')} style={{width: '100%', height: '100%'}}>

                <Grid>
                    <Row>
                        <Col>
                            <Image source={require('../img/logo.png')} style={{width: '100%', flex: 1}}/>
                        </Col>
                        <Col>
                            <Fab/>
                        </Col>
                    </Row>
                    <Row style={{flex: 3}}>
                        <CurrentPlaylist/>
                    </Row>
                    <Row style={{flex: 1}}>
                        <MusicPlayer img={img}
                                     onTogglePlayback={togglePlayback}/>
                    </Row>
                </Grid>
            </ImageBackground>
        </Container>

    );

}


export default HomeScreen;
