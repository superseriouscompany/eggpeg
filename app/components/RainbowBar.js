'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
import base from '../styles/base'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class RainbowBar extends Component {
  constructor(props) {
     super(props);
     this.state = {
       offsetX: new Animated.Value(-screenWidth * 2),
     };
   }

   componentDidMount() {
     Animated.timing(
       this.state.offsetX,
       {toValue: screenWidth / 2, duration: 1000, delay: 150}
     ).start();
   }

   render() {
     return (
       <Animated.View
       style={[this.props.style, style.barContainer, {transform: [{translateX: this.state.offsetX}]}]}>
         <Bar style={{width: screenWidth * 2, height: this.props.barHeight}} color={base.colors.green} />
         <Bar style={{width: screenWidth * 1.8, height: this.props.barHeight }} color={base.colors.yellow} />
         <Bar style={{width: screenWidth * 1.6, height: this.props.barHeight}} color={base.colors.orange} />
         <Bar style={{width: screenWidth * 1.4, height: this.props.barHeight}} color={base.colors.red} />
         <Bar style={{width: screenWidth * 1.2, height: this.props.barHeight}} color={base.colors.purple} />
         <Bar style={{width: screenWidth * 1, height: this.props.barHeight}} color={base.colors.blue} />
       </Animated.View>
     );
   }
}

function Bar(props) {
  return (
    <View style={[style.bar, props.style, {backgroundColor: props.color}]} />
  )
}

const barHeight = 25;

const style = StyleSheet.create({
  bar: {
    height: barHeight,
  },
  barContainer: {
    position: 'absolute',
    width: screenWidth * 2,
  },
});
