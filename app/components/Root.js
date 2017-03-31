'use strict';

import React               from 'react';
import {Provider}          from 'react-redux'
import Component           from './Component'
import FollowUs            from './FollowUs'
import Start               from './Start'
import Settings            from './Settings'
import Worlds             from './Worlds'
import HallOfFame          from './HallOfFame'
import DeeplinkProvider    from '../containers/DeeplinkProvider'
import Game                from '../containers/Game';
import IAPProvider         from '../containers/IAPProvider'
import MigrateProvider     from '../containers/MigrateProvider'
import LeaderboardProvider from '../containers/LeaderboardProvider'
import store               from '../reducers'
import sounds              from '../sounds'
import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = { scene: 'Start'}
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      if( state.scene.current ) {
        this.setState({
          scene:      state.scene.current,
          sceneProps: state.scene.props,
        })
      }
    })
  }

  render() { return (
    <View style={style.container}>
      <Provider store={store}>
        <DeeplinkProvider>
          <IAPProvider>
            <MigrateProvider>
              <LeaderboardProvider>
                { this.state.scene == 'Game' ?
                  <Game />
                : this.state.scene == 'AboutUs' ?
                  <FollowUs />
                : this.state.scene == 'Start' ?
                  <Start shareLink={this.state.shareLink}/>
                : this.state.scene == 'Worlds' ?
                  <Worlds />
                : this.state.scene == 'Settings' ?
                  <Settings />
                : this.state.scene == 'HallOfFame' ?
                  <HallOfFame {...this.state.sceneProps}/>
                :
                  <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
                }
              </LeaderboardProvider>
            </MigrateProvider>
          </IAPProvider>
        </DeeplinkProvider>
      </Provider>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
