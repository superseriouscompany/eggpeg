'use strict';

import React                              from 'react'
import Component                          from './Component'
import HallOfFameView                     from '../views/HallOfFameView'
import {connect}                          from 'react-redux'
import {enqueueRetry}                     from '../actions/retry'
import {postScore, stubScore, loadScores} from '../actions/leaderboard'
import RatingRequestor                    from 'react-native-rating-requestor'
import config                             from '../config'
import {
  Platform,
  Share,
} from 'react-native';

const RatingTracker = new RatingRequestor('1212152764', {
  title: 'Rate us, for the love of God',
  message: 'We need this to survive.',
  actionLabels: {
    decline: 'Nope',
    delay: 'Maybe later...',
    accept: 'Sure!',
  },
  order: ['delay', 'decline', 'accept'],
  timingFunction: (count) => {
    return true
  },
});

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
      score: props.score,
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

    this.props.dispatch(stubScore(this.props.score, this.state.name))
    if( this.props.myScore.id ) {
      this.props.dispatch(clearScore(this.props.myScore.id))
    }
    this.props.dispatch({type: 'score:record', top: this.props.score, name: this.state.name })
    setTimeout(() => {
      RatingTracker.handlePositiveEvent()
    }, config.timings.ratingDelay)
    this.props.back()
    return this.props.dispatch(postScore(this.props.score, this.state.name)).then((id) => {
      this.props.dispatch({type: 'score:tag', id: id})
    }).catch((err) => {
      this.props.dispatch(enqueueRetry({type: 'postScore', score: this.props.score, name: this.state.name}))
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
  const myScore = state.score.top ? {
    score: state.score.top,
    name:  state.score.name,
    id:    state.score.id,
  } : {};

  return {
    myScore:   myScore,
    scores:    state.leaderboard.scores.map((s) => {
      // http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
      s.hasEmoji = s.name.match(/(\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/g)
      return s
    }),
    shareLink: state.shareLink,
    loading:   state.leaderboard.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    back: () => dispatch({type: 'scene:pop', animation: 'riseOut'}),
    retry: () => {
      dispatch(loadScores())
    },
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
