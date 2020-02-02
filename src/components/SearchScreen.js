/**
 * Created by rocky on 2/15/18.
 */
/**
 * Created by rocky on 2/14/18.
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Container, Body, Header, Content, Item, Input, Title, Icon,Form, Right , List, ListItem, Text} from 'native-base';
const net = require('react-native-tcp');

export default class SearchScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: '#3287f4',
            },
            headerTitle: <Title> Song Request</Title>,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            songList: [],
            limit:1
        };
    }
    async _updateLimit(limit) {
        const today = (new Date()).toLocaleDateString();
        try {
            await AsyncStorage.setItem('@SongLimit:key', limit.toString());
            await AsyncStorage.setItem('@Date:key', today);
        } catch (error) {
            alert(error)
        }
    }
    async _getLimit() {
        const today = (new Date()).toLocaleDateString();
        try {
            let date = await AsyncStorage.getItem('@Date:key');
            let limit = await AsyncStorage.getItem('@SongLimit:key');
            if (date !== today){
                this._updateLimit(5);
                limit = await AsyncStorage.getItem('@SongLimit:key');
            }

           if (limit !== null) {
               this.setState({limit: parseInt(limit)});
              }

        } catch (error) {
            alert(error)
        }
    }

    searchSong(searchText) {
        try {
            const client = net.createConnection({port: 443, host: '79.106.138.138'}, () => {
                //'connect' listener
                console.log('connected to server!');
                client.write(`Search=* ${searchText} *\r\n`);
            });
            client.on('data', (data) => {
                this.setState({songList: data.toString().split(/\r?\n/)});
                client.end();
            });
            client.on('end', () => {
                console.log('disconnected from server');
            });
        } catch (error) {
            alert(error)
        }

    }

    submitSong(name) {
        try {
            const client = net.createConnection({port: 443, host: '79.106.138.138'}, () => {
                //'connect' listener
                console.log('connected to server!');
                client.write(`Insert Request=${name}| 0.0.0.0\r\n`);
            });
            client.on('data', (data) => {
                alert(data.toString());
                client.end();
            });
            client.on('end', () => {
                console.log('disconnected from server');
            });
        } catch (error) {
            alert(error)
        }

    }

    componentDidMount(){

       this._getLimit()
    }
    render() {
        let limit = parseInt(this.state.limit);
        const {songList} = this.state;

        return (
            <Container>
                <Content>
                    <Form>
                        <Item onPress={() => this.searchSong(this.state.text)}>
                            <Input placeholder='search a song'
                                   onChangeText={(text) => this.setState({text})}
                                   onSubmitEditing={() => this.searchSong(this.state.text)}
                            />
                            <Icon name='search'/>
                        </Item>
                    </Form>

                    <Content>
                        <ListItem>
                            <Body>
                            <Text>You can request {limit <= 0 ? 0  : limit} songs today.</Text>
                            </Body>
                        </ListItem>
                       <List>
                        {songList.length > 2 ? songList.map((song, idx) => {

                            const [singer, name, fileName] = song.split(/\|/);

                            if (singer && name && fileName) {
                                return (<ListItem key={idx}>
                                    <Body>
                                    <Text>{name}</Text>
                                    <Text note>{singer}</Text>
                                    </Body>
                                    <Right>
                                        <TouchableOpacity onPress={() => {
                                            this._updateLimit(limit - 1);
                                            this._getLimit();

                                            if(limit <= 0) {
                                                alert('Sorry you have used up your request limits')
                                            } else {
                                                this.submitSong(fileName);
                                            }

                                        }
                                        }>
                                            <Icon name='paper-plane'/>
                                            <Text note>submit</Text>
                                        </TouchableOpacity>

                                    </Right>
                                </ListItem>)
                            }
                            return null
                        }) : (
                            <ListItem>
                            <Body>
                            <Text>No Results</Text>
                            </Body>
                        </ListItem>)}

                    </List>
                    </Content>




                </Content>
            </Container>
        )
    }
}