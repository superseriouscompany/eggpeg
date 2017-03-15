'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import LinksHeader from './LinksHeader'
import HighScores from './HighScores'
import DifficultySwitch from './DifficultySwitch'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Victory extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    isHighScore: PropTypes.bool.isRequired,
    highScores:  PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  render() { return (
    <View style={style.container}>
      <LinksHeader />
      <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
        <HighScores
          explanationText={'you beat it all!'}
          explanationStyle={style.explanation}
          scores={this.props.highScores}
          score={this.props.score}
          isHigh={this.props.isHighScore} />

        <Image source={require('../images/Splat.png')} />
        <View style={style.bottom}>
          <TouchableOpacity onPress={this.props.reset} style={style.button}>
            <Text style={style.buttonText}>again</Text>
          </TouchableOpacity>
          <DifficultySwitch />
        </View>
      </View>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E5',
    alignItems: 'center',
  },

  explanation: {
    color: '#838386',
    fontSize: 32,
    fontStyle: 'italic',
    marginBottom: 15,
  },

  button: {
    borderColor: '#838386',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    paddingTop: 12,
    paddingBottom: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  bottom: {
    marginTop: 25,
    marginBottom: 50,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 32,
  },
})
