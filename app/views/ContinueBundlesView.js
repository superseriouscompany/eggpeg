import React    from 'react'
import Text     from '../components/Text'
import {colors} from '../styles/base'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function ContinueBundlesView(props) {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.leftNav} onPress={props.exit}>
        <View style={[style.backButton, {height: 38, width: 38, paddingRight: 2}]}>
          <Image source={require('../images/LeftBackArrow.png')}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={style.restore} onPress={props.restorePurchases}>
        <Text style={style.restoreText}>restore purchases</Text>
      </TouchableOpacity>

      <Text style={style.proclamation}>
        you can buy {"\n"} more continues
      </Text>

      <View style={style.buttonsContainer}>
        { (props.products || []).map((p, key) => (
          <TouchableOpacity key={key} onPress={() => props.buy(p.identifier)} style={[style.button, {
            backgroundColor: color(p.identifier),
          }]}>
            <Text style={style.buttonText}>
              { p.identifier === 'com.superserious.eggpeg.continue4' ?
                `4 for ${p.priceString}`
              : p.identifier === 'com.superserious.eggpeg.continue5000' ?
                `5,000! ${p.priceString}`
              :
                `${p.title} for ${p.priceString}`
              }
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

function color(id) {
  switch(id) {
    case 'com.superserious.eggpeg.continue4':
      return colors.red
    case 'com.superserious.eggpeg.continue50':
      return colors.purple
    case 'com.superserious.eggpeg.continue5000':
      return colors.blue
    default:
      return colors.green
  }
}

const style = StyleSheet.create({
  container: {
    flex:            1,
    paddingBottom:   27,
    paddingLeft:     30,
    paddingRight:    30,
    alignItems:      'center',
  },
  leftNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius:    5,
    alignItems:      'center',
    justifyContent:  'center',
  },
  restore: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 26,
    paddingRight: 21,
  },
  restoreText: {
    color: 'white',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    width:         '100%',
    borderRadius:  5,
    marginTop:     9,
    paddingTop:    16,
    paddingBottom: 18,
  },
  buttonText: {
    color:     'white',
    fontSize:  32,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  proclamation: {
    fontSize: 32,
    marginTop: 150,
    marginBottom: 66 - 9,
    textAlign: 'center',
    color: 'white',
  },
})
