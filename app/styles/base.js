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
  darkgreen: '#406720',
  darkyellow: '#906510',
  darkorange: '#834511',
  darkred: '#9F352D',
  darkpurple: '#532D5A',
  darkblue: '#2B7FB0',
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
