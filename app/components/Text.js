'use strict';

// https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance
import React from 'react';
import Component from './Component';
import {
  Text,
} from 'react-native';

export default class AppText extends Component {
  constructor(props) {
    super(props)
    this.style = [{fontFamily: 'Futura-Medium', color: '#838386', fontSize: 14}];
    if( props.style ) {
      if( Array.isArray(props.style) ) {
        this.style = this.style.concat(props.style)
      } else {
        this.style.push(props.style)
      }
    }
  }

  render() { return (
    <Text {...this.props} style={this.style}>
      {this.props.children}
    </Text>
  )}
}
