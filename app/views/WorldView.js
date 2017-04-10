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
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window')

export default function(props) {
  const image = backgroundImage(props.world.background)

  return (
    <View style={style.container}>
      <StatusBar hidden/>

      { props.beat ?
        <Victory
          score={props.score}
          reset={() => props.dispatch({type: 'scene:change', scene: 'Worlds'})}
          isHighScore={true} />
      :
        <Animated.View style={{flex: 1,
          backgroundColor: props.pulse.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [props.level.color, props.world.lightColor, props.world.lightColor],
          })
        }}>
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
          { image ?
            <View style={style.tiled}>
              <Image source={image} style={{width: width, aspectRatio: 1, }}/>
              <Image source={image} style={{width: width, aspectRatio: 1, }}/>
              <Image source={image} style={{width: width, aspectRatio: 1, }}/>
            </View>
          : null }
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
        </Animated.View>
      }
    </View>
  )
}

function backgroundImage(background) {
  switch(background) {
    case 'GreenBackground.png':
      return require('../images/GreenBackground.png')
    case 'YellowBackground.png':
      return require('../images/YellowBackground.png')
    case 'OrangeBackground.png':
      return require('../images/OrangeBackground.png')
    case 'RedBackground.png':
      return require('../images/RedBackground.png')
    case 'PurpleBackground.png':
      return require('../images/PurpleBackground.png')
    case 'BlueBackground.png':
      return require('../images/BlueBackground.png')
    default:
      console.warn('No image found for', background)
      return null
  }
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
    backgroundColor: 'transparent',
  },
  tiled: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0,
    zIndex: -2,
  },
  hint: {
    fontSize:     18,
    marginBottom: 20,
    color:        'white',
    backgroundColor: 'transparent',
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
