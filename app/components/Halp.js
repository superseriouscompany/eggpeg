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
    this.setState({
      apparentDiameter: 10
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
            Distance: {this.state.distance}
          </Text>
          <Text>
            Diameter: {this.state.diameter}
          </Text>
          <Text>
            Apparent Diameter: { this.state.apparentDiameter}
          </Text>
        </View>
      </View>
    </View>
  )}
}
