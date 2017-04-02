'use strict';

import React, {Component, PropTypes} from 'react';
import Victory                       from '../components/Victory'
import GameHeader                    from '../components/GameHeader'
import GameOver                      from '../components/GameOver'
import ScoreText                     from '../components/ScoreText'
import Level                         from '../components/Level'
import ProgressBar                   from './ProgressBar'
import WorldScore                    from './WorldScore'
import {colors}                      from '../styles/base'
import config                        from '../config'
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
          : !props.worldDone ?
            <GameHeader />
          :
            null
          }
          { props.worldDone ?
            <View style={[style.worldScoreContainer]}>
              <WorldScore animate={true} score={props.score || 'nope'} color={props.level.deadColor}/>
            </View>
          : null}
          <Level done={props.worldDone}/>
          <View style={style.pauseContainer}>
            <TouchableOpacity onPress={props.pause}>
              <Text>||</Text>
              { props.world.paused ?
                <Text>paused</Text>
              : null }
            </TouchableOpacity>
          </View>
          <ProgressBar style={style.progressBar} progress={props.progress} color={props.level.deadColor}/>

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
  worldScoreContainer: {
    position:       'absolute',
    left:           0,
    top:            0,
    bottom:         0,
    right:          0,
    justifyContent: 'center',
    alignItems:     'center',
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
  pauseContainer: {
    position: 'absolute',
    left: 10,
    bottom: 15,
  },
})
