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
      distance:         0,
      diameter:         250,
      apparentDiameter: 250,
      angularDiameter:  3.14,
    }
  }

  update() {
    const angularDiameter  = calcAngularDiameter(this.state.distance, this.state.diameter)
    const apparentDiameter = calcApparentDiameter(this.state.distance, angularDiameter, this.state.diameter)
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
        <Slider
          value={this.state.diameter}
          minimumValue={10}
          maximumValue={200}
          step={10}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({diameter: value})}
          onSlidingComplete={this.update}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>
            dist: {this.state.distance}
          </Text>
          <Text>
            d: {this.state.diameter}
          </Text>
          <Text>
            ad: { this.state.angularDiameter.toPrecision(3)}
          </Text>
          <Text>
            vd: { this.state.apparentDiameter.toPrecision(3)}
          </Text>
        </View>
      </View>
    </View>
  )}
}


function calcAngularDiameter(distance, diameter) {
  return 2 * Math.atan(
    diameter / (2 * distance)
  )
}

function calcApparentDiameter(distance, angularDiameter, diameter) {
  return distance === 0 ? diameter : diameter / distance;
}
