'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {changeMode} from '../actions/difficulty'
import base from '../styles/base'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class DifficultySwitch extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  render() {
    if( !this.props.unlocked ) { return null; }
    const theme = this.props.dark ? 'dark' : 'light'
    return (
      <TouchableOpacity onPress={this.toggle} style={this.props.style}>
        <View style={[style.box, styles[theme].box, styles[this.props.mode].box]}>
          <Text style={[style.text, styles[theme].text, styles[this.props.mode].text]}>{this.props.mode}</Text>
          <View style={[style.clit, styles[theme].clit, styles[this.props.mode].clit]} />
        </View>
      </TouchableOpacity>
    )
  }

  toggle() {
    const mode = this.props.mode === 'easy' ? 'hard' : 'easy';
    this.props.dispatch(changeMode(mode))
  }
}

function mapStateToProps(state) {
  return {
    unlocked: state.difficulty.unlocked,
    mode:     state.difficulty.mode,
  }
}

const clitWidth = 30;

const styles = {
  hard: {
    box: {
      paddingRight: clitWidth + 1,
      paddingLeft: 4,
      justifyContent: 'center',
    },
    clit: {
      right: 1,
    }
  },
  easy: {
    box: {
      paddingLeft: clitWidth + 1,
      paddingRight: 4,
      justifyContent: 'flex-end',
    },
    clit: {
      left: 1,
    }
  },
  dark: {
    box: {
      backgroundColor: 'white',
    },
    clit: {
      backgroundColor: '#532D5A',
    },
    text: {
      color: '#532D5A',
    }
  },
  light: {
    box: {
      backgroundColor: base.colors.grey,
    },
    clit: {
      backgroundColor: base.colors.beige,
    },
    text: {
      color: 'white',
    },
  },
}

const style = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderRadius: 5,
    height: 34,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  clit: {
    width: clitWidth,
    top: 1,
    bottom: 1,
    borderRadius: 5,
    position: 'absolute',
  },
  text: {
    paddingLeft: 6,
    paddingRight: 6,
  }
})

export default connect(mapStateToProps)(DifficultySwitch)
