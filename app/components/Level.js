'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import ScoreText from './ScoreText';
import Target from './Target';
import Bullet from './Bullet';
import Text from './Text';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class Level extends Component {
  static propTypes={
    shoot: PropTypes.func.isRequired,
    bullets: PropTypes.arrayOf(PropTypes.shape({

    })),
    targets: PropTypes.arrayOf(PropTypes.shape({

    })),
  }

  render() { return (
    <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
      <View style={{flex: 1}}>
        { this.props.targets.map((target, key) => (
          <Target key={key} target={target} hit={target.hit}/>
        ))}
        { this.props.bullets.map((bullet, key) => (
          <Bullet key={key} bullet={bullet} hit={bullet.hit}/>
        ))}
        { this.props.hint ?
          <View style={style.hintContainer}>
            <Text style={style.hint}>{this.props.hint}</Text>
          </View>
        :
          <ScoreText />
        }
      </View>
    </TouchableWithoutFeedback>
  )}
}

const style = StyleSheet.create({
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: -1,
  },
  hint: {
    color: '#532D5A',
    fontSize: 16,
    marginBottom: 20,
  },
})
