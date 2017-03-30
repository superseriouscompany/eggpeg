'use strict';

import React            from 'react'
import Component        from './Component'
import Text             from './Text'
import {connect}        from 'react-redux'
import {loadFirstLevel} from '../actions/levels'
import {colors}         from '../styles/base'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Worlds extends Component {
  loadLevel(name) {
    this.props.dispatch({type: 'worlds:select', name: name})
    this.props.dispatch({type: 'game:reset'})
    this.props.dispatch(loadFirstLevel(this.props.showTutorial))
    this.props.dispatch({type: 'scene:change', scene: 'Game'})
  }

  render() { return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
          <Text>back</Text>
        </TouchableOpacity>
        <View style={style.scoresContainer}>
          <Text style={style.topScore}>420</Text>
          <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:change', scene: 'HallOfFame'})}>
            <Text style={style.leaderboard}>see top scores</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.grid}>
        {this.props.worlds.map((w, key) => (
          <View key={key} style={style.worldContainer}>
            { w.comingSoon ?
              <View style={style.greyedOut}>
                <World world={w} key={key} />
              </View>
            : w.locked ?
              <View style={style.greyedOut}>
                <World world={w} key={key} />
              </View>
            :
              <TouchableOpacity onPress={() => this.loadLevel(w.name)}>
                <World world={w} key={key} />
              </TouchableOpacity>
            }
          </View>
        ))}
      </View>
    </View>
  )}
}

function World(props) {
  return (
    <View style={style.world}>
      <View style={[style.preview, {
        backgroundColor: props.world.color,
      }]}>
        <Text style={style.status}>
          { props.world.locked ?
            '🔒'
          : props.world.comingSoon ?
            '⏳'
          : props.world.name}
        </Text>
      </View>
      <Text style={style.maxScore}>
        { props.world.comingSoon ?
          'coming soon...'
        : props.world.locked ?
          'locked'
        : props.world.score ?
          `${props.world.score}/${props.world.maxScore}`
        :
          `0%`
        }
      </Text>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    worlds:       state.worlds.all,
    showTutorial: !state.tutorial.complete,
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex:            1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    paddingTop:    40,
    alignItems:    'flex-start',
  },
  header: {
    padding: 20,
  },
  scoresContainer: {
    justifyContent: 'center',
    alignItems:     'center',
  },
  topScore: {
    fontSize: 64,
  },
  leaderboard: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: -5,
  },
  worldContainer: {
    width:           '50%',
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   37,
  },
  greyedOut: {
    opacity: 0.5,
  },
  world: {
    alignItems:        'center',
    justifyContent:    'center',
  },
  preview: {
    width:          '90%',
    aspectRatio:    1,
    justifyContent: 'center',
    alignItems:     'center',
    borderRadius:   5,
    marginTop:      5,
    marginBottom:   5,
    borderBottomWidth: 2,
    borderColor:       'rgba(0,0,0,0.5)',
  },
  number: {
    fontSize: 32,
  },
  status: {
    fontSize: 64,
    color:    'rgba(0,0,0,0.4)',
  },
  maxScore: {
    fontSize: 18,
  }
})

export default connect(mapStateToProps)(Worlds)
