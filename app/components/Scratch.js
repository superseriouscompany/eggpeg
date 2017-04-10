'use strict'

import React     from 'react'
import Component from './Component'
import Text      from './Text'
import {connect} from 'react-redux'
import {
  ScrollView,
  View,
} from 'react-native'

class Scratch extends Component {
  render() { console.warn(this.props.scores.length); return (
    <View style={{flex: 1}}>
      <Text style={{backgroundColor: 'cornflowerblue'}}>Hey</Text>
      <ScrollView style={{flex: 1, backgroundColor: 'hotpink'}}>
          { this.props.scores.map((s, key) => (
            <View key={key} style={{width: '100%', backgroundColor: 'lawngreen', flexDirection: 'row'}}>
              <Text>
                {s.hasEmoji ? 'Yep' : 'Nope'}
              </Text>
              <Text adjustsFontSizeToFit={!s.hasEmoji} numberOfLines={1} style={{flex: 1, fontFamily: 'Futura-Medium', color: 'white'}}>{s.name}</Text>
              <Text>420</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    scores: state.leaderboard.scores.map((s) => {
      return {
        ...s,
        name: s.name + 'abcdefghijklmnopqrstuvwxyz',
        hasEmoji: s.name.match(/(\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g),
      }
    }),
  }
}

export default connect(mapStateToProps)(Scratch)
