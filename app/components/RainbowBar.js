'use strict';

import React, { PropTypes } from 'react';
import Component            from './Component';
import base                 from '../styles/base'
import config               from '../config'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

const screenWidth      = Dimensions.get('window').width;
const defaultBarHeight = 25;

export default class RainbowBar extends Component {
  static propTypes = {
    finalOffset: PropTypes.number,
    leave:       PropTypes.bool,
    complete:    PropTypes.func,
  }

  constructor(props) {
     super(props);
     this.state = {
       offsetX: new Animated.Value(-screenWidth * 2),
     };
   }

   componentDidMount() {
     Animated.timing(this.state.offsetX, {
       toValue: this.props.finalOffset ? this.props.finalOffset + 10 : (screenWidth / 2),
       duration: config.timings.rainbow,
       delay: config.timings.rainbowDelay
     }).start(() => {
       if( !this.props.leave ) { return; }
       Animated.stagger(config.timings.rainbowLeaveDelay, [
         Animated.spring(this.state.offsetX, {
           toValue: this.props.finalOffset || (screenWidth / 2),
           tension: 2,
           friction: 3,
         }),
         Animated.timing(this.state.offsetX, {
           toValue: screenWidth,
           duration: config.timings.rainbowLeaveDuration,
         })
       ]).start(() => {
         this.props.complete && this.props.complete()
       });
     });
   }

   render() {
     return (
       <Animated.View style={[this.props.style, style.barContainer, {
         transform: [{translateX: this.state.offsetX}]
       }]}>
         <Bar color={base.colors.green}  style={{width: screenWidth * 2,   height: this.props.barHeight || defaultBarHeight}} />
         <Bar color={base.colors.yellow} style={{width: screenWidth * 1.8, height: this.props.barHeight || defaultBarHeight}} />
         <Bar color={base.colors.orange} style={{width: screenWidth * 1.6, height: this.props.barHeight || defaultBarHeight}} />
         <Bar color={base.colors.red}    style={{width: screenWidth * 1.4, height: this.props.barHeight || defaultBarHeight}} />
         <Bar color={base.colors.purple} style={{width: screenWidth * 1.2, height: this.props.barHeight || defaultBarHeight}} />
         <Bar color={base.colors.blue}   style={{width: screenWidth * 1,   height: this.props.barHeight || defaultBarHeight}} />
       </Animated.View>
     );
   }
}

function Bar(props) {
  return (
    <View style={[style.bar, props.style, {backgroundColor: props.color}]} />
  )
}

const style = StyleSheet.create({
  barContainer: {
    position: 'absolute',
    width: screenWidth * 2,
  },
});
