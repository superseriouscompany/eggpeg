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
    const score    = 69;
    const scores   = fakeScores()
    const position = insertScore(score, scores)
    const y        = Math.max(0, position - 3) * 83.5
  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
          <Text>&larr; Back</Text>
        </TouchableOpacity>
        <Text>hall of fame</Text>
      </View>
      <ScrollView ref="scrollView"
                  onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({y: y})}
                  style={style.leaderboard}>
        {scores.map((s, key) => (
          <View key={key}>
            { s.name ?
              <Score place={key+1} name={s.name} score={s.score} />
            :
              <View>
                <TextInput style={style.input} onChangeText={(name) => this.setState({name})} value={this.state.text} />
                <TouchableOpacity onPress={this.postScore}>
                  <Text>Post Score</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        ))}
      </ScrollView>
    </View>
  )}
}

function Score(props) {
  return (
    <View style={style.scoreContainer}>
      <Text style={style.place}>{props.place}</Text>
      <Text style={style.name}>{props.name}</Text>
      <Text style={style.score}>{props.score}</Text>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    score:  state.score.total,
    scores: state.leaderboard.scores,
  }
}

function fakeScores() {
  return "Hello is it me you're looking for? so santi told me to fill the leaderboard with 100 scores with fake names on them so that we don't have to make an empty state for this screen. it's going pretty well. I'm not sure if I'm close to 100 yet. Watching a sunset out the window right now, it's pretty beautiful. Ok anyway we should be around 100 now. Byeeeeeee. Oh goddamnit I still have to make like 30 more scores hm ok Kevin lost his sim card today that was pretty scary are we good yet? damnit. ugh finally".split(' ').map((name, i) => {
    return {name: name, score: 100 - i}
  })
}

function insertScore(score, scores) {
  let slot = -1;
  for( var i = 0; i < scores.length; i++ ) {
    if( scores[i].name && scores[i].score <= score ) {
      slot = i;
      break;
    }
  }

  if( slot == - 1 ) { return scores }
  scores.splice(slot, 0, {score: score, name: false,});
  return slot
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'hotpink',
  },
  leaderboard: {
    flex: 1,
  },
  place: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    top: 3,
    left: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'cornflowerblue',
    paddingLeft: 23,
    paddingTop: 19,
    paddingBottom: 22,
    paddingRight: 21,
  },
  name: {
    flex: 1,
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
  },
  score: {
    fontSize: 32,
    color: 'white',
  },
})

export default connect(mapStateToProps)(HallOfFame)
