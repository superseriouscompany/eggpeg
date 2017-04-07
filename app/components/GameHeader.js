'use strict';

import React      from 'react';
import Component  from './Component';
import Text       from './Text';
import RainbowBar from './RainbowBar'
import config     from '../config'
import sounds     from '../sounds'
import {connect}  from 'react-redux'
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class GameHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreAnim: new Animated.Value(0),
      score: props.score,
    }
    this.displayScore = this.displayScore.bind(this)
    this.state.scoreAnim.addListener(this.displayScore);
  }

  componentWillUnmount() {
    this.state.scoreAnim.removeListener(this.displayScore);
  }

  displayScore(animation) {
    this.setState({
      score: Math.round(this.props.score - this.state.delta + this.state.delta * animation.value)
    })
  }

  componentWillReceiveProps(props) {
    // TODO:
    if( props.isDemo ) { return; }

    if( props.score != this.props.score ) {
      this.setState({
        delta: props.score - (this.props.score || 0),
      })
      Animated.timing(
        this.state.scoreAnim,
        {toValue: 1, duration: config.timings.scoreIncrement}
      ).start(() => {
        this.state.scoreAnim.setValue(0)
        this.setState({
          score: props.score,
        })
      });
      if( props.newHighScore ) {
        sounds.bugles.play(null, (err) => {
          console.error(err)
        })
      }
    }
  }

  render() { return (
    <View style={style.header}>
      { this.props.isHighScore ?
        <RainbowBar barHeight={7.5} finalOffset={screenWidth - 50} leave={true} complete={this.props.completeRainbowAnimation}/>
      :
        null
      }
      <View style={{flexDirection: 'row', flex: 1}}>
        <Egg filled={this.props.tries >= 1} />
        <Egg filled={this.props.tries >= 2} />
        <Egg filled={this.props.tries >= 3} />
      </View>

      { this.props.isDemo ?
        null
      :
        <Animated.Text style={[style.score, {
          fontSize: this.state.scoreAnim.interpolate({
            inputRange:  [0, .5, 1],
            outputRange: [18, 21, 18],
          })
        }]}>
          {this.state.score}
        </Animated.Text>
      }
    </View>
  )}
}

function Egg(props) {
  const image = props.filled ? require('../images/Egg.png') : require('../images/EggEmpty.png');
  return (<Image source={image} style={style.egg}/>)
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 11,
    paddingTop: 9,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  egg: {
    margin: 3,
  },
  score: {
    margin: 3,
    color: 'white',
    backgroundColor: 'transparent',
  }
})

function mapStateToProps(state) {
  return {
    isDemo:      state.worlds.current && state.worlds.current.name === 'Demo',
    isHighScore: state.session.goal && state.session.score >= state.session.goal,
    tries:       state.chamber,
    score:       state.session.score,
  }
}

export default connect(mapStateToProps)(GameHeader)
