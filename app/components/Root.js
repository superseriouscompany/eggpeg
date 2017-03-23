'use strict';

import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Root() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stage />
        <View>
          <DeeplinkProvider />
          <IAPProvider />
          <MigrateProvider />
          <LeaderboardProvider />
          <DevProvider />
        </View>
      </View>
    </Provider>
  )
}
