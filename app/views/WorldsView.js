import React    from 'react'
import {colors} from '../styles/base'
import Text     from '../components/Text'
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function(props) {
return(
  <View style={style.container}>
    <StatusBar hidden/>
    <View>
      <TouchableOpacity style={style.leftNav} onPress={props.back}>
        <Text>back</Text>
      </TouchableOpacity>
      <View style={style.scoresContainer}>
        { props.topScore ?
          <View>
            <Text style={style.topScore}>{props.topScore}</Text>
            <TouchableOpacity onPress={props.showLeaderboard}>
              <Text style={style.leaderboard}>see top scores</Text>
            </TouchableOpacity>
          </View>
        :
          <Text style={style.topScore}>Levels</Text>
        }
      </View>
    </View>
    <View style={style.grid}>
      {props.worlds.map((w, key) => (
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
            <TouchableOpacity onPress={() => props.loadLevel(w.name)}>
              <World world={w} key={key} />
            </TouchableOpacity>
          }
        </View>
      ))}
    </View>
  </View>
)}

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
  leftNav: {
    width: 120,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  scoresContainer: {
    justifyContent: 'center',
    alignItems:     'center',
  },
  topScore: {
    fontSize: 64,
    textAlign: 'center',
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
  },
})
