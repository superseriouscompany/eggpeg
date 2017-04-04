import React             from 'react'
import Text              from '../components/Text'
import EggDrop           from '../components/EggDrop'
import LinksHeader       from '../components/LinksHeader'
import RainbowButtonView from './RainbowButtonView'
import base              from '../styles/base'
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function(props) {
  return (
    <View style={[style.container]}>
      <StatusBar hidden/>

      <View style={{flex: 1}}>
        <LinksHeader />
        <View style={style.main}>
          <EggDrop />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <RainbowButtonView style={style.startButton} textStyle={style.startButtonText} onPress={props.startGame}>
              play
            </RainbowButtonView>
          </View>
        </View>
        { __DEV__ ?
          <TouchableOpacity onPress={props.clearStore}>
            <Text>Clear all data</Text>
          </TouchableOpacity>
        : null}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.colors.beige,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 1,
    borderColor: base.colors.grey,
    borderRadius: 5,
    width: 200,
    height: 75,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontStyle: 'italic',
    fontSize: 32,
    color: 'white',
    fontFamily: 'Futura-Medium',
  },
})
