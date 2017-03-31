'use strict';

import React, {Component, PropTypes} from 'react';
import Victory                       from '../components/Victory'
import GameHeader                    from '../components/GameHeader'
import GameOver                      from '../components/GameOver'
import Level                         from '../components/Level'
import {colors}                      from '../styles/base'
import config                        from '../config'
import {
  StatusBar,
  StyleSheet,
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
})
