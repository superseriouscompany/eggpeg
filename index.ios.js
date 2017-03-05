import React, { Component } from 'react';
import Root from './app/components/Root';
import {
  AppRegistry,
} from 'react-native';

export default class sniper extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('sniper', () => sniper);
