/**
 * Created by rocky on 2/15/18.
 */

const net = require('react-native-tcp');

function searchSong(searchText, dataHandle) {
    const client = net.createConnection({port: 443, host: '79.106.138.138'}, () => {
        //'connect' listener
        console.log('connected to server!');
        client.write(`Search=* ${searchText} *\r\n`);
    });
    client.on('data', (data) => {
        dataHandle(data);
        client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function submitSong(name, dataHandle) {
    const client = net.createConnection({port: 443, host: '79.106.138.138'}, () => {
        //'connect' listener
        console.log('connected to server!');
        client.write(`Insert Request=${name}| 127.0.0.1\r\n`);
    });
    client.on('data', (data) => {
        dataHandle(data);
        client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
}

export{searchSong, submitSong}