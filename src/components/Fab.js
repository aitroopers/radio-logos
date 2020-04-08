/**
 * Created by rocky on 2/14/18.
 */
import React, { Component } from 'react';

import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { Linking} from 'react-native';

export default class FABExample extends Component {
  constructor() {
      super();
    this.state = {
      active: 'false'
    };
  }
  render() {
    return (
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            direction="left"
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={() => Linking.openURL('https://www.radiologos.al')}>
              <Icon name="logo-chrome" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={ ()=> Linking.openURL('https://facebook.com/RadioLogos/') }>
              <Icon name="logo-facebook" />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }} onPress={()=> Linking.openURL('mailto:info@radiologos.al')}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
    );
  }
}
