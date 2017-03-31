'use strict';

import React                  from 'react'
import Component              from './Component'
import HallOfFameView         from '../views/HallOfFameView'
import {connect}              from 'react-redux'
import {enqueueRetry}         from '../actions/retry'
import {postScore, stubScore} from '../actions/leaderboard'
import {
  Platform,
  Share,
} from 'react-native';

class HallOfFame extends Component {
  constructor(props) {
    super(props)
    this.postScore   = this.postScore.bind(this)
    this.handleProps = this.handleProps.bind(this)
    this.shareDialog = this.shareDialog.bind(this)
    this.setName     = this.setName.bind(this)
    this.state       = { name: '' }
  }

  componentDidMount() {
    this.handleProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.handleProps(props)
  }

  handleProps(props) {
    // TODO: this is all messy, feels error prone
    if( this.state.inserted ) { return console.warn('Already inserted score'); }
    let state = {
      scores: [].concat(props.scores),
    }
    if( props.induction ) {
      state.scorePosition = insertScore(props.score, state.scores)
      state.inserted = state.scorePosition != -1
    }
    this.setState(state);
  }

  setName(name) {
    this.setState({name})
  }

  postScore() {
    if( !this.state.name.length ) { return alert('You must enter your name.') }
    if( this.state.name.length > 20 ) { return alert('Your name can only be 20 characters') }

    return this.props.dispatch(postScore(this.props.score, this.state.name)).catch((err) => {
      this.props.dispatch(stubScore(this.props.score, this.state.name))
      this.props.dispatch(enqueueRetry({type: 'postScore', score: this.props.score, name: this.state.name}))
    }).then(() => {
      this.props.dispatch({type: 'scene:change', scene: 'Worlds'})
    })
  }

  shareDialog() {
    this.shareTimeout && clearTimeout(this.shareTimeout);
    if( !this.props.shareLink ) {
      this.shareTimeout = setTimeout(this.shareDialog, 200);
      return;
    }

    Share.share({
      message: Platform.OS == 'android' ? `Download Egg Peg ${this.props.shareLink}` : 'Download Egg Peg',
      url: this.props.shareLink,
    }, {
      dialogTitle: 'Invite Friends',
      tintColor: 'blue'
    })
  }

  render() {
    let scores = this.state.scores || []
    // we have to limit the nodes for animation performance
    if( this.props.animating ) {
      scores = scores.slice(0, 10)
    }

    return <HallOfFameView {...this.props}
              text={this.state.text}
              setName={this.setName}
              shareDialog={this.shareDialog}
              postScore={this.postScore}
              scores={scores}
              scorePosition={this.state.scorePosition} />
  }
}

function mapStateToProps(state) {
  return {
    scores:    state.leaderboard.scores,
    shareLink: state.shareLink,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    back: () => dispatch({type: 'scene:pop', animation: 'riseOut'})
  }
}

function insertScore(score, scores) {
  let slot = -1;
  for( var i = 0; i < scores.length; i++ ) {
    if( scores[i].score <= score ) {
      if( !scores[i].name ) { return i; }
      slot = i;
      break;
    }
  }

  if( slot == - 1 ) { return -1 }
  scores.splice(slot, 0, {score: score, name: false,});
  scores.pop();
  return slot
}

export default connect(mapStateToProps, mapDispatchToProps)(HallOfFame)
