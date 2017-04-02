import React, {Component}      from 'react'
import {colors}   from '../styles/base'
import Text       from '../components/Text'
import WorldScore from './WorldScore'
import config     from '../config'
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const lockImages = {
  '1': require('../images/Lock1.png'),
  '2': require('../images/Lock2.png'),
  '3': require('../images/Lock3.png'),
  '4': require('../images/Lock4.png'),
  '5': require('../images/Lock5.png'),
  '6': require('../images/Lock6.png'),
}

const {width, height} = Dimensions.get('window')

export default class WorldsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandAnim: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(props) {
    if( !props.animateOut || props.animateOut === this.props.animateOut ) { return; }
    this.state.expandAnim.setValue(0)
    Animated.timing(this.state.expandAnim, {
      toValue: 1, duration: config.timings.worldIn,
    }).start()
  }

  componentDidMount() {
    if( !this.props.animateIn ) { return }

    this.state.expandAnim.setValue(1)
    Animated.timing(this.state.expandAnim, {
      toValue: 0, duration: config.timings.worldIn,
    }).start()
  }

  render() {
    const props = this.props
    return(
      <View style={style.container}>
        <StatusBar hidden/>

        <View style={style.scoresContainer}>
          { props.topScore ?

            <View>
              { props.shouldInduct ?
                <TouchableOpacity onPress={() => props.induct(props.topScore)}>
                  <Text style={style.topScore}>{props.topScore}</Text>
                  <Text style={style.leaderboard}>
                    Put your name in the Hall of Fame!
                  </Text>
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={props.showLeaderboard}>
                  <Text style={style.topScore}>{props.topScore}</Text>
                  <Text style={style.leaderboard}>see top scores</Text>
                </TouchableOpacity>
              }
            </View>
          :
            <Text style={style.hint}>choose a level</Text>
          }
        </View>

        <View style={style.grid}>
          {props.worlds.map((w, key) => (
            <View key={key} style={[style.worldContainer, w.name === props.selectedName ? style.activeContainer : null]}>
              { w.comingSoon || w.locked ?
                  <World world={w} />
              :
                <World expandAnim={this.state.expandAnim} world={w} selectedName={props.selectedName} onPress={() => props.loadLevel(w.name)}/>
              }
            </View>
          ))}
        </View>

        <TouchableOpacity style={style.leftNav} onPress={props.back}>
          <Text>back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class World extends Component {
  constructor(props) {
    super(props)
    this.state = {pulse: new Animated.Value(0)}
    this.pulse = this.pulse.bind(this)
  }

  componentDidMount() {
    if( !this.props.world.score && !this.props.world.locked && !this.props.world.comingSoon ) {
      this.pulse()
    }
  }

  pulse() {
    this.state.pulse.setValue(0)
    Animated.timing(this.state.pulse, {
      toValue:  1,
      duration: config.timings.worldPulse,
    }).start(this.pulse)
  }

  render() {
    const props = this.props
    const isActivating = props.selectedName && props.selectedName == props.world.name;
    return (
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[style.world, props.world.locked || props.world.comingSoon ? style.greyedOut : null]}>
          <Animated.View style={[style.preview, props.world.locked || props.world.comingSoon ? null : style.shadow, {
            backgroundColor: this.state.pulse.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [props.world.color, props.world.deadColor || colors.grey, props.world.color]
            }),
          }, isActivating ? {
            transform: [{
              scale: props.expandAnim.interpolate({
                inputRange:  [0, 1],
                outputRange: [1, 8],
              })
            }],
            zIndex: 1,
          } : null]}>
              { props.world.locked ?
                <Image source={lockImages[props.world.name]}/>
              : props.world.comingSoon ?
                <Text style={style.status}>...</Text>
              :
                <Animated.View style={[isActivating ? {
                  opacity: props.expandAnim.interpolate({
                    inputRange:  [0, 0.0001, 1],
                    outputRange: [1, 0, 0],
                  })
                } : null]}>
                    { props.world.score ?
                      <View>
                        <Text style={style.status}>{props.world.score || '---'}</Text>
                        <Text style={[style.status, style.points]}>pts</Text>
                      </View>
                    :
                      <Text style={[style.status, {fontSize: 32}]}>{props.world.name}</Text>
                    }
                </Animated.View>
              }
          </Animated.View>
          <Text style={style.maxScore}>
            { props.world.comingSoon ?
              'coming soon'
            : props.world.locked ?
              'locked'
            : !props.world.percentage ?
              '0%'
            : props.world.percentage === 1 ?
              `${props.world.score}/${props.world.maxScore}`
            :
              `${Math.round(props.world.percentage*100)}%`
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
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
    alignItems:    'flex-start',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
  },
  worldContainer: {
    width:           '50%',
    alignItems:     'center',
    justifyContent: 'center',
    paddingBottom: 11,
  },
  leftNav: {
    position:        'absolute',
    left:            20,
    top:             20,
    backgroundColor: 'transparent',
    zIndex:          -1,
  },
  scoresContainer: {
    justifyContent: 'center',
    alignItems:     'center',
    marginTop: 40,
    paddingBottom: 25,
  },
  activeContainer: {
    zIndex: 1,
  },
  scoreContainer: {
    justifyContent:  'center',
    alignItems:      'center',
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    bottom:          0,
    zIndex:          1,
    backgroundColor: 'transparent',
  },
  topScore: {
    fontSize: 64,
    textAlign: 'center',
  },
  hint: {
    marginTop: 15,
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  leaderboard: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: -5,
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
    borderColor:       'rgba(0,0,0,0)',
  },
  shadow: {
    borderColor:       'rgba(0,0,0,0.5)',
  },
  number: {
    fontSize: 32,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    textAlign: 'center',
    fontSize: 64,
    color:    'rgba(0,0,0,0.4)',
    backgroundColor: 'transparent',
  },
  points: {
    marginTop: -20,
    marginBottom: 4,
    fontSize: 32,
    backgroundColor: 'transparent',
  },
  maxScore: {
    fontSize: 18,
  },
})
