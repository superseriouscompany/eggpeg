'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
import base from '../styles/base'
import config from '../config'
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
       pan: new Animated.ValueXY({x: -screenWidth * 2, y: 0}),
     };
   }

   // TODO: make a more coherent API for this component
   componentDidMount() {
     Animated.timing(
       this.state.pan.x,
       {toValue: this.props.finalOffset + 5 || (screenWidth / 2), duration: config.timings.rainbow, delay: config.timings.rainbowDelay}
     ).start(() => {
       if( !this.props.leave ) { return; }
       Animated.spring(this.state.pan, {
         toValue: {x: this.props.finalOffset - 5 || (screenWidth / 2), y: 0},
         duration: 10000,
         delay: 100,
         tension: 2,
         friction: 3
       }).start(() => {
         Animated.timing(
           this.state.pan.x,
           {toValue: screenWidth, duration: 100, delay: 100}
         ).start(() => {
           this.props.complete && this.props.complete()
         });
       });
     });
   }

   render() {
     return (
       <Animated.View
       style={[this.props.style, style.barContainer, {
         transform: [{translateX: this.state.pan.x}]
       }]}>
         <Bar style={{width: screenWidth * 2, height: this.props.barHeight}}    color={base.colors.green} />
         <Bar style={{width: screenWidth * 1.8, height: this.props.barHeight }} color={base.colors.yellow} />
         <Bar style={{width: screenWidth * 1.6, height: this.props.barHeight}}  color={base.colors.orange} />
         <Bar style={{width: screenWidth * 1.4, height: this.props.barHeight}}  color={base.colors.red} />
         <Bar style={{width: screenWidth * 1.2, height: this.props.barHeight}}  color={base.colors.purple} />
         <Bar style={{width: screenWidth * 1, height: this.props.barHeight}}    color={base.colors.blue} />
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
