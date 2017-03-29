'use strict';

import React     from 'react'
import Component from './Component'
import Text      from './Text'
import {connect} from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Leaderboard extends Component {
  render() { return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
        <Text>&larr; Back</Text>
      </TouchableOpacity>
      { this.props.scores.map((s, key) => (
        <Text key={key}>
          {s.name} {s.score}
        </Text>
      ))}
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    scores: state.leaderboard.scores,
  }
}

const style = StyleSheet.create({
  container: {
    padding: 40,
  }
})

export default connect(mapStateToProps)(Leaderboard)
