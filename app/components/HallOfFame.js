'use strict';

import React                  from 'react'
import Component              from './Component'
import Text                   from './Text'
import {connect}              from 'react-redux'
import {enqueueRetry}         from '../actions/retry'
import {postScore, stubScore} from '../actions/leaderboard'
import {
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

class HallOfFame extends Component {
  constructor(props) {
    super(props)
    this.postScore   = this.postScore.bind(this)
    this.handleProps = this.handleProps.bind(this)
    this.state       = { name: '' }
  }

  componentDidMount() {
    this.handleProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.handleProps(props)
  }

  handleProps(props) {
    // TODO: this is all messy, feels error prone
    if( this.state.inserted ) { return console.warn('Already inserted score'); }
    let state = {
      scores: [].concat(props.scores),
    }
    if( props.induction ) {
      state.scorePosition = insertScore(props.score, state.scores)
      state.inserted = state.scorePosition != -1
    }
    this.setState(state);
  }

  postScore() {
    if( !this.state.name.length ) { return alert('You must enter your name.') }
    if( this.state.name.length > 20 ) { return alert('Your name can only be 20 characters') }

    return this.props.dispatch(postScore(this.props.score, this.state.name)).catch((err) => {
      this.props.dispatch(stubScore(this.props.score, this.state.name))
      this.props.dispatch(enqueueRetry({type: 'postScore', score: this.props.score, name: this.state.name}))
    }).then(() => {
      this.props.dispatch({type: 'scene:change', scene: 'Worlds'})
    })
  }

  render() {
    const y = (this.state.scorePosition && Math.max(0, this.state.scorePosition - 3) * 83.5) || 0
  return (
    <View style={style.container}>
      <StatusBar hidden/>

      <View style={style.header}>
        <View style={{position: 'absolute', paddingTop: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <Text>HALL OF FAME</Text>
        </View>
        <TouchableOpacity style={[style.leftNav, {justifyContent: 'center'}]} onPress={() => this.props.dispatch({type: 'scene:pop'})}>
          <Image source={require('../images/UpArrow.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.rightNav} onPress={this.shareDialog}>
          <Text style={[this.props.textStyle, {fontStyle: 'italic', textAlign: 'right'}]}>invite</Text>
        </TouchableOpacity>
      </View>
      <ScrollView ref="scrollView"
                  onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({y: y})}
                  style={style.leaderboard}>
        {(this.state.scores || []).map((s, key) => (
          <View key={key}>
            { s.name ?
              <Score place={key+1} name={s.name} score={s.score} color={color(key)}/>
            :
              <View style={[style.scoreContainer, style.scoreInputContainer, {
                backgroundColor: color(key),
              }]}>
                <Text style={style.place}>{key+1}</Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoFocus={true}
                  placeholder={'your name'}
                  returnKeyType={'go'}
                  style={style.input}
                  onSubmitEditing={this.postScore}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.text} />
                <Text style={style.score}>{s.score}!</Text>
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
    <View style={[style.scoreContainer, {backgroundColor: props.color}]}>
      <Text style={style.place}>{props.place}</Text>
      <Text style={style.name} numberOfLines={1}>{props.name}</Text>
      <Text style={style.score}>{props.score}</Text>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    scores: state.leaderboard.scores,
  }
}

function insertScore(score, scores) {
  let slot = -1;
  for( var i = 0; i < scores.length; i++ ) {
    if( scores[i].score <= score ) {
      if( !scores[i].name ) { return i; }
      slot = i;
      break;
    }
  }

  if( slot == - 1 ) { return -1 }
  scores.splice(slot, 0, {score: score, name: false,});
  scores.pop();
  return slot
}

function color(index) {
  const stops = [
    { r: 56,  g: 158, b: 217 },
    { r: 139, g: 80,  b: 151 },
    { r: 209, g: 83,  b: 74 },
    { r: 234, g: 138, b: 57 },
    { r: 245, g: 184, b: 64 },
    { r: 121, g: 178, b: 73 },
  ]

  const sectionSize = 100 / (stops.length-1);
  let section       = Math.floor(index / sectionSize)
  let relativeIndex = index % sectionSize;

  const src = stops[section];
  const dst = stops[section+1];

  const rdelta = (dst.r - src.r) / sectionSize;
  const gdelta = (dst.g - src.g) / sectionSize;
  const bdelta = (dst.b - src.b) / sectionSize;

  const r = src.r + (rdelta*relativeIndex);
  const g = src.g + (gdelta*relativeIndex);
  const b = src.b + (bdelta*relativeIndex);

  return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    flex: 1,
    backgroundColor: 'cornflowerblue',
    color: 'white',
    fontSize: 32,
    marginRight: 20,
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
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'cornflowerblue',
    paddingLeft: 23,
    paddingTop: 19,
    paddingBottom: 22,
    paddingRight: 21,
  },
  scoreInputContainer: {
    backgroundColor: 'hotpink',
  },
  name: {
    flex: 1,
    fontSize: 32,
    paddingRight: 20,
    color: 'white',
    backgroundColor: 'transparent',
  },
  score: {
    fontSize: 32,
    color: 'white',
  },
  leftNav: {
    width: 120,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  rightNav: {
    width: 120,
    padding: 20,
    paddingLeft: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
})

export default connect(mapStateToProps)(HallOfFame)
