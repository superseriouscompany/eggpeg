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
          : props.world.paused ?
            <GameOver
              paused={true}
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
          { props.world.name !== 'Demo' && !props.worldDone ?
            <TouchableOpacity style={style.pauseContainer} onPress={props.pause}>
              <View style={[style.pauseBar, {backgroundColor: props.level.deadColor}]}></View>
              <View style={[style.pauseBar, {backgroundColor: props.level.deadColor}]}></View>
            </TouchableOpacity>
          : null }
          <ProgressBar style={style.progressBar} progress={props.progress} color={props.level.deadColor}/>

          { props.hint ?
            <View style={style.hintContainer}>
              <Text style={[style.hint]}>{props.hint}</Text>
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
    position: 'absolute',
    bottom: 10,
    zIndex: -1,
    width: '100%',
  },
  hint: {
    fontSize:     16,
    marginBottom: 20,
    color:        'white',
  },
  pauseContainer: {
    position: 'absolute',
    left: 0,
    padding: 20,
    paddingLeft: 22,
    paddingBottom: 23,
    bottom: 0,
    marginBottom: -7,
    flexDirection: 'row',
  },
  pauseBar: {
    height: 14,
    width: 4,
    marginLeft: 1.5,
    marginRight: 1.5,
    borderRadius: 1,
  },
})
