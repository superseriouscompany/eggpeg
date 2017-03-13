'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Slider,
  View,
} from 'react-native';

export default class Halp extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.state = {
      distance: 0,
      diameter: 100,
      apparentDiameter: 100,
    }
  }

  update() {
    const angularDiameter  = calcAngularDiameter(this.state.distance, this.state.diameter)
    const apparentDiameter = calcApparentDiameter(this.state.distance, angularDiameter)
    this.setState({
      angularDiameter,
      apparentDiameter,
    });
  }

  render() { return (
    <View style={{flex: 1, padding: 20}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
          width: this.state.apparentDiameter,
          height: this.state.apparentDiameter,
          backgroundColor: 'hotpink',
          borderRadius: this.state.apparentDiameter / 2,
        }} />
      </View>
      <View>
        <Slider
          value={this.state.distance}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({distance: value})}
          onSlidingComplete={this.update}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>
            distance: {this.state.distance}
          </Text>
          <Text>
            angular diameter: { this.state.angularDiameter}
          </Text>
          <Text>
            diameter: { this.state.apparentDiameter}
          </Text>
        </View>
      </View>
    </View>
  )}
}


function calcAngularDiameter(distance, diameter) {
  return (2 * Math.atan(
    diameter / (2 * distance)
  )).toPrecision(3)
}

function calcApparentDiameter(distance, angularDiameter) {
  return Math.round(Math.random() * 400)
}
