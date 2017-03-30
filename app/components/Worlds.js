'use strict';

import React            from 'react'
import Component        from './Component'
import Text             from './Text'
import {connect}        from 'react-redux'
import {loadFirstLevel} from '../actions/levels'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Worlds extends Component {
  loadLevel(name) {
    return () => {
      alert('loading ' + name)
      this.props.dispatch({type: 'game:reset'})
      this.props.dispatch(loadFirstLevel(this.props.showTutorial))
      this.props.dispatch({type: 'scene:change', scene: 'Game'})
    }
  }

  render() { return (
    <View style={style.grid}>
      {this.props.worlds.map((w, key) => (
        <View key={key} style={style.worldContainer}>
          { w.comingSoon ?
            <View style={style.greyedOut}>
              <World world={w} key={key} load={this.loadLevel(w.name)}/>
            </View>
          : w.locked ?
            <View>
              <World world={w} key={key} load={this.loadLevel(w.name)}/>
            </View>
          :
            <TouchableOpacity onPress={() => this.loadLevel(w.name)}>
              <World world={w} key={key} load={this.loadLevel(w.name)}/>
            </TouchableOpacity>
          }
        </View>
      ))}
    </View>
  )}
}

function World(props) {
  return (
    <View style={style.world}>
      <Text style={style.number}>{props.world.name}</Text>
      <View style={[style.preview, {
        backgroundColor: props.world.color,
      }]}>
        <Text style={style.status}>
          { props.world.locked ?
            '🔒'
          : props.world.beaten ?
            '✅'
          : props.world.comingSoon ?
            '⏳'
          : null}
        </Text>
      </View>
      <Text style={style.maxScore}>
        { props.world.comingSoon ?
          'coming soon...'
        : props.world.score ?
          `${props.world.score}/${props.world.maxScore}`
        :
          `${props.world.maxScore} points`
        }
      </Text>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    worlds:       state.worlds,
    showTutorial: !state.tutorial.complete,
  }
}

const style = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    paddingTop:    40,
    alignItems: 'flex-start',
  },
  worldContainer: {
    width:          '33.333333%',
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   40,
  },
  world: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyedOut: {
    opacity: 0.5,
  },
  number: {
    fontSize: 32,
  },
  status: {
    fontSize: 32,
  },
  preview: {
    width:          100,
    height:         100,
    justifyContent: 'center',
    alignItems:     'center',
    borderRadius:   5,
    marginTop:      5,
    marginBottom:   5,
  },
  maxScore: {
    fontSize: 14,
  }
})

export default connect(mapStateToProps)(Worlds)
