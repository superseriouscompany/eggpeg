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
      scoreAnim:  new Animated.ValueXY(),
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
    setTimeout(() => {
      this.refs[`world-${this.props.selectedName}`].measure((ox, oy, w, h, px, py) => {
        Animated.timing(this.state.expandAnim, {
          toValue: 0.0001, duration: config.timings.worldIn,
        }).start()

        Animated.timing(this.state.scoreAnim, {
          toValue: {
            x: px - (width / 2) + (w / 2),
            y: py - (height / 2) + (h / 2) - 10,
          }
        }).start()
      })
    })
  }

  render() {
    const props = this.props
    return(
      <View style={style.container}>
        <StatusBar hidden/>
        <TouchableOpacity onPress={props.back}>
          <Text style={style.leftNav}>back</Text>
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
            <Text style={style.hint}>choose a level</Text>
          }
        </View>

        { props.lastScore ?
          <Animated.View style={[style.scoreContainer, {
            transform: [{
              translateX: this.state.scoreAnim.x,
            }, {
              translateY: this.state.scoreAnim.y,
            }]
          }]}>
            <WorldScore animate={false} score={props.lastScore} color={props.lastWorld.deadColor}/>
          </Animated.View>
        : null }

        <View style={style.grid}>
          {props.worlds.map((w, key) => (
            <View ref={`world-${w.name}`} key={key} style={[style.worldContainer, w.name === props.selectedName ? style.activeContainer : null]}>
              { w.comingSoon ?
                <View style={style.greyedOut}>
                  <World world={w} />
                </View>
              : w.locked ?
                <View style={style.greyedOut}>
                  <World world={w} />
                </View>
              :
                <World expandAnim={this.state.expandAnim} world={w} selectedName={props.selectedName} onPress={() => props.loadLevel(w.name)}/>
              }
            </View>
          ))}
        </View>
      </View>
    )
  }
}

function World(props) {
  const isActivating = props.selectedName && props.selectedName == props.world.name;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[style.world]}>
        <Animated.View style={[style.preview, props.world.locked || props.world.comingSoon ? null : style.shadow, {
          backgroundColor: props.world.color,
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
              <Animated.Text style={[style.status, isActivating ? {
                opacity: props.expandAnim.interpolate({
                  inputRange: [0, 0.0001, 1],
                  outputRange: [1, 0, 0],
                })
              } : null]}>{props.world.name}</Animated.Text>
            }
        </Animated.View>
        <Text style={style.maxScore}>
          { props.world.comingSoon ?
            'coming soon'
          : props.world.locked ?
            'locked'
          : props.world.score ?
            `${props.world.score}/${props.world.maxScore}`
          :
            `0%`
          }
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
    alignItems:    'flex-start',
  },
  worldContainer: {
    width:           '50%',
    alignItems:     'center',
    justifyContent: 'center',
  },
  leftNav: {
    position: 'absolute',
    top:      20,
    left:     20,
  },
  scoresContainer: {
    justifyContent: 'center',
    alignItems:     'center',
    marginTop: 40,
    paddingBottom: 20,
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
    fontSize: 32,
    textAlign: 'center',
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
  status: {
    fontSize: 64,
    color:    'rgba(0,0,0,0.4)',
  },
  maxScore: {
    fontSize: 18,
  },
})
