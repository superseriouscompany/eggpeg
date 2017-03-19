'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import ScoreText from './ScoreText';
import Target from './Target';
import Bullet from './Bullet';
import Text from './Text';
import {recordScore} from '../actions/scores'
import {connect} from 'react-redux'
import config from '../config'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

let running = true;

class Level extends Component {
  static propTypes={
    shoot: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.gameLoop = this.gameLoop.bind(this)
    this.iterate  = this.iterate.bind(this)
  }

  componentDidMount() {
    running = true;
    this.gameLoop()
  }

  componentWillUnmount() {
    // setState doesn't work here for some reason
    running = false;
  }

  gameLoop() {
    this.iterate();
    if( !running ) { return; }
    requestAnimationFrame(this.gameLoop)
  }

  iterate() {
    if( this.props.level.done ) { return; }
    if( this.props.level.finishTime ) {
      console.log('level', this.props.level)
      if( +new Date <= this.props.level.finishTime ) { return; }
      return this.props.dispatch({type: 'level:finish'})
    }
    this.props.dispatch({type: 'tick'})

    const {bullets, targets} = this.props;

    // TODO: this is a janky way of checking for multi hits. There should be an abstraction that
    // handles sequencing the animations
    let hadMultihit = false;
    bullets.forEach((bullet, bi) => {
      let hits = []
      targets.forEach((target, index) => {
        if( bullet.visible && !target.hit && isCollision(target, bullet) ) {
          const magicNumber = Math.sqrt(
            (
              Math.pow(target.width, 2) + 2 * target.width * bullet.width + Math.pow(bullet.width, 2)
            ) / 2
          )
          const accuracy = distance(target, bullet) / magicNumber;
          const score =
            accuracy < 0.3 ? 5 :
            accuracy < 0.6 ? 2 :
            1;
          const ring =
            accuracy < 0.3 ? 'bullseye' :
            accuracy < 0.6 ? 'inner' :
            'outer';

          score *= config.scoreBonus
          this.props.dispatch({type: 'targets:hit', index, score, ring})
          hits.push({score: score})
        }
      })
      if( hits.length ) {
        let score = hits.reduce((a, v) => { return a + v.score}, 0)
        if( hits.length > 1 ) {
          hadMultihit = true
          score *= hits.length
        }
        this.props.dispatch({type: 'bullets:hit', index: bi, score: score, count: hits.length})
      }
    })

    const allHit = !this.props.targets.find((t) => { return !t.hit })
    // check if all hit
    if( this.props.targets.length && allHit ) {
      // TODO: this magic number should be generated from config
      // TODO: ideally, this would happen directly from a callback
      const delay = hadMultihit ? 2250 : 0;

      return this.props.dispatch({type: 'level:win', delay: delay});
    }


    if( this.props.chamber <= 0 ) {
      const allSpent = !this.props.bullets.find((b) => { return !b.spent })
      if( allSpent ) {
        this.props.dispatch(recordScore(this.props.score.total)).catch((err) => {
          console.error(err)
        })
        this.props.dispatch({type: 'level:loss'})
      }
    }
  }

  render() { return (
    <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
      <View style={{flex: 1}}>
        { this.props.targets.map((target, key) => (
          <Target key={key} target={target} hit={target.hit}/>
        ))}
        { this.props.bullets.map((bullet, key) => (
          <Bullet key={key} bullet={bullet} hit={bullet.hit}/>
        ))}
        { this.props.hint ?
          <View style={style.hintContainer}>
            <Text style={style.hint}>{this.props.hint}</Text>
          </View>
        :
          <ScoreText />
        }
      </View>
    </TouchableWithoutFeedback>
  )}
}

const style = StyleSheet.create({
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: -1,
  },
  hint: {
    color: '#532D5A',
    fontSize: 16,
    marginBottom: 20,
  },
})

// http://stackoverflow.com/questions/8367512/algorithm-to-detect-if-a-circles-intersect-with-any-other-circle-in-the-same-pla
function isCollision(t, b) {
  const r0 = t.width/2;
  const r1 = b.width/2;

  const maxDistance = Math.pow(t.x - b.x, 2) + Math.pow(t.y - b.y, 2);

  return distance(t,b) <= r0 + r1;
}

// https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Distance_between_two_points
function distance(t, b) {
  return Math.sqrt(Math.pow(t.x - b.x, 2) + Math.pow(t.y - b.y, 2))
}

function mapStateToProps(state) {
  return {
    bullets:    state.bullets,
    targets:    state.targets,
    chamber:    state.chamber,
    level:      state.level,
    score:      state.score,
    beat:       state.victory,
  }
}

export default connect(mapStateToProps)(Level)
