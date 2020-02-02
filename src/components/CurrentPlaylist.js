import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    H2,
    Header,
    Icon,
    List,
    ListItem,
    Right,
    Text,
    Title
} from "native-base";
const net = require('react-native-tcp');

export default class CurrentPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songList: [],
        };
    }

    componentDidMount(){
        this.requestList()
    }

    requestList() {
        try {
            const client = net.createConnection({port: 443, host: '79.106.138.138'}, () => {
                //'connect' listener
                console.log('connected to server!');
                client.write("List requests\r\n");
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

    render() {
        const {songList} = this.state;
        return (
            <View style={{flex: 2}}>
                <Container>
                    <Content>
                        <ListItem>
                            <Body>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row"}}>
                                <H2 style={{fontWeight: "bold", color: '#d1fffc'}}>Current Requested Songs</H2>
                                <TouchableOpacity onPress={() => this.requestList()}>
                                    <Icon name='refresh' style={{color: "#636363"}}/>
                                </TouchableOpacity>
                            </View>
                            </Body>
                        </ListItem>
                        <List>
                            {songList.length > 2 ? songList.map((song, idx) => {


                                const [time, singer, name] = song.split(/\|/);

                                if (singer && name && time) {
                                    return (<ListItem key={idx}>
                                        <Body>
                                        <Text>{name}</Text>
                                        <Text note>{singer}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{time}</Text>
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

                </Container>

            </View>

        );
    }
}