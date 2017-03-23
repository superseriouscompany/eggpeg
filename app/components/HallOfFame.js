'use strict';

import React       from 'react'
import Component   from './Component'
import Text        from './Text'
import {connect}   from 'react-redux'
import {postScore} from '../actions/leaderboard'
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

class HallOfFame extends Component {
  constructor(props) {
    super(props)
    this.postScore = this.postScore.bind(this)
    this.state = { name: '' }
  }

  postScore() {
    return this.props.dispatch(postScore(this.props.score, this.state.name)).then(() => {
      this.props.dispatch({type: 'scene:change', scene: 'Start'})
    }).catch((err) => {
      alert(err)
    })
  }

  render() { return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
        <Text>&larr; Back</Text>
      </TouchableOpacity>
      <Text>You scored {this.props.score}!</Text>
      <TextInput style={style.input} onChangeText={(name) => this.setState({name})} value={this.state.text} />

      <TouchableOpacity onPress={this.postScore}>
        <Text>Post Score</Text>
      </TouchableOpacity>
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    score: state.score.total,
  }
}

const style = StyleSheet.create({
  container: {
    padding: 100,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'hotpink',
  },
})

export default connect(mapStateToProps)(HallOfFame)
