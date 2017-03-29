'use strict';

import React                  from 'react'
import Component              from './Component'
import Text                   from './Text'
import {connect}              from 'react-redux'
import {enqueueRetry}         from '../actions/retry'
import {postScore, stubScore} from '../actions/leaderboard'
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
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
    if( !this.state.name.length ) { return alert('You must enter your name.') }
    if( this.state.name.length > 20 ) { return alert('Your name can only be 20 characters') }

    return this.props.dispatch(postScore(this.props.score, this.state.name)).catch((err) => {
      this.props.dispatch(stubScore(this.props.score, this.state.name))
      this.props.dispatch(enqueueRetry({type: 'postScore', score: this.props.score, name: this.state.name}))
    }).then(() => {
      this.props.dispatch({type: 'scene:change', scene: 'Start'})
    })
  }

  render() {
    const score = 69;
    const scores = fakeScores()

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
          <Text>&larr; Back</Text>
        </TouchableOpacity>
        <Text>hall of fame</Text>
      </View>
      <ScrollView style={style.leaderboard}>
        {scores.map((s, key) => (
          <Text key={key}>
            {s.name} {s.score}
          </Text>
        ))}
        <TextInput style={style.input} onChangeText={(name) => this.setState({name})} value={this.state.text} />
        <TouchableOpacity onPress={this.postScore}>
          <Text>Post Score</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    score:  state.score.total,
    scores: state.leaderboard.scores,
  }
}

function fakeScores() {
  return "Hello is it me you're looking for? so santi told me to fill the leaderboard with 100 scores with fake names on them so that we don't have to make an empty state for this screen. it's going pretty well. I'm not sure if I'm close to 100 yet. Watching a sunset out the window right now, it's pretty beautiful. Ok anyway we should be around 100 now. Byeeeeeee. Oh goddamnit I still have to make like 30 more scores hm ok Kevin lost his sim card today that was pretty scary are we good yet? damnit. ok just four more".split(' ').map((name, i) => {
    return {name: name, score: 100 - i}
  })
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
