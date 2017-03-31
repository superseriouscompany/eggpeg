'use strict';

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import config             from '../config'
import sounds             from '../sounds'
import {recordScore}      from '../actions/scores'

let running = true;
class GameLoop extends Component {
  constructor(props) {
    super(props)
    this.loop    = this.loop.bind(this)
    this.iterate = this.iterate.bind(this)
  }

  componentDidMount() {
    running = true;
    this.loop()
  }

  componentWillUnmount() {
    // setState doesn't work here for some reason
    running = false;
  }

  loop() {
    this.iterate();
    if( !running ) { return; }
    requestAnimationFrame(this.loop);
  }

  iterate() {
    if( this.props.level.loading ) { return; }

    this.props.dispatch({type: 'tick'})

    if( this.props.level.finishTime ) {
      if( +new Date <= this.props.level.finishTime ) { return; }
      return this.props.dispatch({type: 'level:finish'})
    }

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
          hits.push({score: score, ring: ring})
        }
      })
      if( hits.length ) {
        if( hits.find((h) => { return h.ring == 'bullseye'}) ) {
          sounds.ding.stop()
          sounds.ding.play(null, (err) => {
            console.error(err)
          })
        } else {
          sounds.splat.stop()
          sounds.splat.play(null, (err) => {
            console.error(err)
          })
        }

        let score = hits.reduce((a, v) => { return a + v.score}, 0)
        if( hits.length > 1 ) {
          hadMultihit = true
          score *= hits.length
        }
        this.props.dispatch({type: 'bullets:hit', index: bi, score: score, count: hits.length})
      } else if( bullet.spent && !bullet.hit && !bullet.missed ){
        this.props.dispatch({type: 'bullets:miss', index: bi})
        if( this.props.world.name == 'Demo' ) {
          this.props.dispatch({type: 'chamber:reload'})
        }
      }
    })

    const allHit = !this.props.targets.find((t) => { return !t.hit })
    // check if all hit
    if( this.props.targets.length && allHit ) {
      // TODO: this magic number should be generated from config
      // TODO: ideally, this would happen directly from a callback
      const delay = hadMultihit ? 2250 : 0;

      this.props.dispatch({type: 'worlds:score', score: this.props.score.total})
      return this.props.dispatch({type: 'level:win', delay: delay});
    }


    if( this.props.chamber <= 0 && !this.props.level.finishTime ) {
      const allSpent = !this.props.bullets.find((b) => { return !b.spent })
      if( allSpent ) {
        this.props.dispatch(recordScore(this.props.score.total)).catch((err) => {
          console.error(err)
        })
        this.props.dispatch({type: 'worlds:score', score: this.props.score.total})
        this.props.dispatch({type: 'level:loss'})
      }
    }
  }

  render() { return this.props.children }
}

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
    world:      state.worlds.current,
  }
}

export default connect(mapStateToProps)(GameLoop)
