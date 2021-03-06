import {
  StyleSheet,
} from 'react-native'

const colors = {
  grey: '#838386',
  beige: '#F8F4E5',
  green: '#9DD56E',
  yellow: '#F9C358',
  orange: '#FA9D4E',
  red: '#F47B72',
  purple: '#AC5CBC',
  blue: '#6BAED4',
  darkbeige: '#A7A18E',
  darkgreen: '#5C9030',
  darkyellow: '#A3761B',
  darkorange: '#A15B1F',
  darkred: '#B84B43',
  darkpurple: '#743182',
  darkblue: '#3E7B9D',
  lightgreen: '#A8E378',
  lightyellow: '#FFD37A',
  lightorange: '#FFAB66',
  lightred: '#FC9188',
  lightpurple: '#B96AC8',
  lightblue: '#81C1E6',
  reward: '#F8F4E5',
}
const fontSizes = {
  big: 20,
}

module.exports = StyleSheet.create({
  bgBreakingSection: {
    backgroundColor: colors.offwhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgrey,
  },
});

module.exports.colors    = colors;
module.exports.fontSizes = fontSizes;
