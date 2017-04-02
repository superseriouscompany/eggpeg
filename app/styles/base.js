import {
  StyleSheet,
} from 'react-native'

const colors = {
  grey: '#838386',
  beige: '#F8F4E5',
  green: '#79B249',
  yellow: '#F5B840',
  orange: '#EA8A39',
  red: '#D1534A',
  purple: '#8B5097',
  blue: '#389ED9',
  darkgreen: '#416720',
  darkyellow: '#906510',
  darkorange: '#9A5113',
  darkred: '#9F352E',
  darkpurple: '#532D5A',
  darkblue: '#2B7FB0',
  lightgreen: '#99D864',
  lightyellow: '#FFCF70',
  lightorange: '#FFA960',
  lightred: '#F77066',
  lightpurple: '#A466B1',
  lightblue: '#64C5FC',
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
