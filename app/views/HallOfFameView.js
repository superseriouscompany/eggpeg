'use strict';

import React     from 'react'
import Component from '../components/Component'
import Text      from '../components/Text'
import {colors}   from '../styles/base'
import {
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window')

// Can't be stateless bc of the ref
export default class HallOfFameView extends Component {
  render() {
    const props = this.props
    const y = (props.scorePosition && Math.max(0, props.scorePosition - 3) * 83.5) || 0
  return (
    <View style={style.container}>
      <StatusBar hidden/>

      <View style={style.header}>
        <View style={style.title}>
          <Text>HALL OF FAME</Text>
        </View>
        <TouchableOpacity style={[style.leftNav, {justifyContent: 'center'}]} onPress={props.back}>
          <Image source={require('../images/UpArrow.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.rightNav} onPress={props.shareDialog}>
          <Text style={[props.textStyle, {fontStyle: 'italic', textAlign: 'right'}]}>invite</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref="scrollView"
                  onContentSizeChange={(width, height) => !this.props.animating && this.refs.scrollView.scrollTo({y: y})}
                  style={style.leaderboard}
                  refreshControl={
                    <RefreshControl
                      tintColor={'hotpink'}
                      refreshing={props.loading || false}
                      onRefresh={props.retry} />}>

        { !props.scores || !props.scores.length ?
          <Text>
            { props.loading ?
              'Loading scores...'
            :
              'Scores didn\'t load. Pull to try again.'
            }
          </Text>
        : null }

        {(props.scores || []).map((s, key) => (
          <View key={key}>
            { s.name ?
              <Score place={key+1} name={s.name} mine={s.score == props.myScore.score && s.name == props.myScore.name } score={s.score} color={color(key)}/>
            :
              <View style={[style.scoreContainer, style.scoreInputContainer, style.mine, {
                backgroundColor: color(key),
              }]}>
                <RainbowBackground/>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoFocus={true}
                  placeholder={'your name'}
                  returnKeyType={'go'}
                  style={[style.input, {
                    backgroundColor: color(key),
                  }]}
                  onSubmitEditing={props.postScore}
                  onChangeText={props.setName}
                  value={props.text} />
                <Text style={[style.score, {fontStyle: 'italic'}]}>{s.score}!</Text>
              </View>
            }
          </View>
        ))}
      </ScrollView>
    </View>
  )}
}

function RainbowBackground(props) {
  return (
    <View style={{position: 'absolute'}}>
      <View style={{width: width, height: 14, backgroundColor: colors.green }} />
      <View style={{width: width, height: 14, backgroundColor: colors.yellow }} />
      <View style={{width: width, height: 14, backgroundColor: colors.orange }} />
      <View style={{width: width, height: 14, backgroundColor: colors.red }} />
      <View style={{width: width, height: 14, backgroundColor: colors.purple }} />
      <View style={{width: width, height: 14, backgroundColor: colors.blue }} />
    </View>
  )
}

function Score(props) {
  return (
    <View style={[style.scoreContainer, {backgroundColor: props.color}, props.mine ? style.mine : null]}>
      { props.mine ? <RainbowBackground/> : null }
      <Text style={style.place}>{props.place}</Text>
      <Text style={style.name} adjustsFontSizeToFit={true} numberOfLines={1}>
        {props.name}
      </Text>
      <Text style={style.score}>{props.score}</Text>
    </View>
  )
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

  if( section === stops.length -1 ) {
    console.warn("Unable to render color for", index)
    return 'rgb(0,0,0)'
  }

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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 52,
    flex: 1,
    borderRadius: 1,
    alignItems: 'center',
    color: 'white',
    fontSize: 32,
    marginRight: 20,
    paddingLeft: 6,
    marginLeft: -6,
  },
  leaderboard: {
    flex: 1,
  },
  title: {
    position: 'absolute',
    paddingTop: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'
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
    paddingLeft: 23,
    paddingTop: 19,
    paddingBottom: 22,
    paddingRight: 21,
  },
  scoreInputContainer: {
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
    backgroundColor: 'transparent',
  },
  mine: {
    backgroundColor: 'hotpink',
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
