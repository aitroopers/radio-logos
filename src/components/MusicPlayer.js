import React, {useState} from 'react';
import TrackPlayer, {} from 'react-native-track-player';
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import {useTrackPlayerEvents, usePlaybackState, useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {View, Icon, Button, Card, CardItem, Text, Body, Container} from 'native-base';
import {choose} from '../utils/utils';


function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
        <View style={styles.progress}>
            <View style={{flex: progress.position, backgroundColor: 'red'}}/>
            <View
                style={{
                    flex: progress.duration - progress.position,
                    backgroundColor: 'grey',
                }}
            />
        </View>
    );
}

function ControlButton({play, onPress}) {
    return (
        <Button transparent light onPress={onPress}>
            {play ? <Icon name={'play'} style={styles.icon}/> : <Icon name={'pause'} style={styles.icon}/>}
        </Button>

    );
}


export default function MusicPlayer(props) {
    const playbackState = usePlaybackState();
    const [trackTitle, setTrackTitle] = useState('');
    const [trackArtist, setTrackArtist] = useState('');

    useTrackPlayerEvents(['playback-metadata-received'], async event => {
        if (event.title) {
            // console.log(track.title);
            setTrackTitle(event.title);
            setTrackArtist(event.artist);
        }

    });

    const {style, onTogglePlayback, img} = props;

    var play = true;

    if (
        playbackState === TrackPlayer.STATE_PLAYING ||
        playbackState === TrackPlayer.STATE_BUFFERING
    ) {
        play = false;
    }


    return (
        <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
            <ProgressBar/>
            <Body>
            <Text>
                <Text style={styles.artist}>{trackArtist} ~ </Text>
                <Text style={styles.title}>{trackTitle}</Text>
            </Text>
            </Body>
            <Body>
            <ControlButton play={play} onPress={onTogglePlayback} style={styles.controls}/>
            </Body>

        </ImageBackground>


    );
}
const styles = StyleSheet.create({

    progress: {
        height: 1,
        width: '99%',
        marginTop: 10,
        flexDirection: 'row',
    },
    title: {
        marginTop: 10,
        color: '#fff',
    },
    controls: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    artist: {
        fontWeight: 'bold',
        color: '#f6ffe0',
    },
    icon: {fontSize: 40, color: '#00ffff'}

});
