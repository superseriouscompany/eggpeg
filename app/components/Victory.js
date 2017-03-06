'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Victory extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    highScores: PropTypes.arrayOf(PropTypes.shape({
	    score:      PropTypes.score,
      time:       PropTypes.date,
	  })),
  }

  render() { return (
    <TouchableOpacity onPress={this.props.reset} style={style.container}>
      <Text style={style.p}>
        You win! &nbsp;
      </Text>

      <Text style={style.p}>
        Honestly, we didn't think anyone would get this far.
      </Text>

      <Text style={style.p}>
        So we uh maybe didn't finish designing this screen.
      </Text>

      <Text style={style.p}>
        ...we love you?
      </Text>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  p: {
    width: 200,
    marginBottom: 20,
  },
  newHighScore: {
    color: 'goldenrod',
  }
})
