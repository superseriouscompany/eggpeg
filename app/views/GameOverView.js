import React      from 'react'
import Text       from '../components/Text'
import PayButton  from '../components/PayButton'
import RainbowBar from '../components/RainbowBar'
import {
  Animated,
  Easing,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default function(props) { return (
  <View style={style.container}>
    <Animated.View style={[style.top, {
      marginTop: props.enterAnim.interpolate({
        inputRange:  [0, 1],
        outputRange: [-1000, 0],
        easing: Easing.elastic(1),
      })
    }]}>

      { props.score > props.worldScore ?
        <RainbowBar />
      : null }
      <Text style={style.score}>{props.score}{props.paused ? '' : '!'}</Text>
      { props.paused ?
        null
      : props.score < props.worldScore ?
        <View style={{flexDirection: 'row'}}>
          <Image style={{marginRight: 6}} source={require('../images/Trophy.png')}/>
          <Text style={style.carrot}>{props.worldScore}</Text>
        </View>
      : props.carrot !== 'boss' ?
        <Text style={style.carrot}>defeat {props.carrot.name}'s {props.carrot.score}</Text>
      : props.score === 0 ?
        <Text style={style.carrot}>try again!</Text>
      : props.firstRun ?
        <Text style={style.carrot}>nice run.</Text>
      :
        <Text style={style.carrot}>you're a boss.</Text>
      }

      <TouchableOpacity style={{position: 'absolute', left: 0, right: 0, paddingTop: 200, alignItems: 'center'}} onPress={props.visitHOF}>
        <Text style={style.topScores}>top scores</Text>
        <Image style={{marginTop: 6}} source={require('../images/BottomCarrot.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style={style.leftNav} onPress={props.visitWorlds}>
        <View style={[style.button, {height: 38, width: 38, paddingLeft: 1}]}>
          <Image source={require('../images/HomeIcon.png')}/>
        </View>
      </TouchableOpacity>
    </Animated.View>

    <Animated.View style={[style.bottom, {
      marginBottom: props.enterAnim.interpolate({
        inputRange:  [0, 1],
        outputRange: [-200, 0],
        easing: Easing.elastic(1.3),
      })
    }]}>

      <TouchableOpacity style={[style.button, {height: 75, width: 75, marginRight: 9}]} onPress={() => {props.paused && props.resume(); props.reset();}}>
        <Image source={require('../images/ReplayIcon.png')}/>
      </TouchableOpacity>

      { props.paused ?
        <TouchableOpacity style={[style.button, style.continueButton]} onPress={props.resume}>
          <Text style={style.buttonText}>resume</Text>
        </TouchableOpacity>
      : props.continues > 0 ?
        <TouchableOpacity style={[style.button, style.continueButton]} onPress={props.continue}>
          <Text style={{position: 'absolute', color: 'white', backgroundColor: 'transparent', top: -31}}>{props.continues} left</Text>
          <Text style={style.buttonText}>continue</Text>
        </TouchableOpacity>
      :
        <TouchableOpacity style={[style.button, style.continueButton]} onPress={props.buyContinues}>
          <Text style={style.buttonText}>continue</Text>
        </TouchableOpacity>
      }
    </Animated.View>
  </View>
)}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position:        'absolute',
    left:            0,
    right:           0,
    top:             0,
    bottom:          0,
    zIndex:          1,
  },
  leftNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  top: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  countdown: {
    color: 'white',
  },
  score: {
    fontSize: 64,
    color:    'white',
  },
  carrot: {
    paddingBottom: 6,
    fontSize: 18,
    color:    'white',
  },
  topScores: {
    color:     'white',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bottom: {
    flexDirection:  'row',
    paddingLeft:    31,
    paddingRight:   31,
    paddingBottom:  27,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius:    5,
    alignItems:      'center',
    justifyContent:  'center',
  },
  continueButton: {
    width:  174.5,
    height: 75,
  },
  buttonText: {
    color: '#4A4A4A',
    fontStyle: 'italic',
    fontSize: 32,
    paddingBottom: 3,
  },
})
