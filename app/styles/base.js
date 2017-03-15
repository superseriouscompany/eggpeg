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
  reward: 'hotpink',
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
