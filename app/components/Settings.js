'use strict';

import React                  from 'react';
import Component              from './Component';
import Text                   from './Text';
import config, {changeConfig} from '../config'
import {connect}              from 'react-redux'
import {
  ScrollView,
  Slider,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, config)
    this.originalConfig = config;
    this.update = this.update.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset() {
    this.setState(this.originalConfig)
    this.update()
  }

  update() {
    changeConfig(this.state)
  }

  render() { return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})} style={style.back}>
        <Text style={style.link}>Back</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={[style.label, {marginTop: 0}]}>
          Target size: {this.state.sizes.target}
        </Text>
        <Slider
          value={this.state.sizes.target}
          minimumValue={20}
          maximumValue={200}
          step={10}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({sizes: {...this.state.sizes, target: value}})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Gravity (m/s^2): {this.state.gravity}
        </Text>
        <Slider
          value={this.state.gravity}
          minimumValue={0}
          maximumValue={9.8}
          step={0.1}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({gravity: value})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Egg drop time (ms): {this.state.bullet.delay}
        </Text>
        <Slider
          value={this.state.bullet.delay}
          minimumValue={0}
          maximumValue={5000}
          step={100}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({bullet: {...this.state.bullet, delay: value}})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Egg linger time (ms): {this.state.bullet.linger}
        </Text>
        <Slider
          value={this.state.bullet.linger}
          minimumValue={0}
          maximumValue={5000}
          step={100}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({bullet: {...this.state.bullet, linger: value}})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Egg start size: {this.state.sizes.shadow}
        </Text>
        <Slider
          value={this.state.sizes.shadow}
          minimumValue={5}
          maximumValue={150}
          step={5}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({sizes: {...this.state.sizes, shadow: value}})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Yolk size: {this.state.sizes.bullet}
        </Text>
        <Slider
          value={this.state.sizes.bullet}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({sizes: {...this.state.sizes, bullet: value}})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Eggs per level: {this.state.chamber}
        </Text>
        <Slider
          value={this.state.chamber}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({chamber: value})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Level loss delay (ms): {this.state.lossDelay}
        </Text>
        <Slider
          value={this.state.lossDelay}
          minimumValue={0}
          maximumValue={5000}
          step={100}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({lossDelay: value})}
          onSlidingComplete={this.update}
          />

        <Text style={style.label}>
          Level win delay (ms): {this.state.winDelay}
        </Text>
        <Slider
          value={this.state.winDelay}
          minimumValue={0}
          maximumValue={5000}
          step={100}
          minimumTrackTintColor="hotpink"
          onValueChange={(value) => this.setState({winDelay: value})}
          onSlidingComplete={this.update}
          />

        <TouchableOpacity onPress={this.reset}>
          <Text style={style.destructive}>
            Reset All
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  back: {
    marginBottom: 20,
  },
  label: {
    marginTop: 40,
    color: 'slateblue',
  },
  destructive: {
    marginTop: 60,
    color: 'indianred',
  }
})

export default connect()(Settings)
