'use strict';

import React, {Component, PropTypes} from 'react';
import Victory                       from '../components/Victory'
import GameHeader                    from '../components/GameHeader'
import GameOver                      from '../components/GameOver'
import ScoreText                     from '../components/ScoreText'
import Level                         from '../components/Level'
import {colors}                      from '../styles/base'
import config                        from '../config'
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function(props) {
  return (
    <View style={style.container}>
      <StatusBar hidden/>

      { props.beat ?
        <Victory
          score={props.score}
          reset={props.reset}
          isHighScore={true} />
      :
        <View style={{flex: 1, backgroundColor: props.level.color}}>
          { props.level.done && !props.level.win ?
            <GameOver
              reset={props.reset}
              continue={props.continue} />
          :
            <GameHeader />
          }
          <Level />
          <Animated.View style={[style.progressBar, {
            backgroundColor: props.level.deadColor,
            width:           props.progressAnim,
          }]} />

          { props.hint ?
            <View style={style.hintContainer}>
              <Text style={[style.hint, {color: props.level.deadColor}]}>{props.hint}</Text>
            </View>
          :
            <ScoreText textColor={props.level.deadColor}/>
          }
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 7,
    width: '17%',
  },
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: -1,
  },
  hint: {
    fontSize: 16,
    marginBottom: 20,
  },
})
