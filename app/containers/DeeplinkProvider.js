'use strict';

import React     from 'react';
import {connect} from 'react-redux';
import branch    from 'react-native-branch';

class DeeplinkProvider extends React.Component {
  componentDidMount() {
    branch.createBranchUniversalObject(
      `default`,
      {
        metadata: {
          link_type: 'default',
        }
      }
    ).then((buo) => {
      let linkProperties = {
        feature: 'friend-invitation',
        channel: 'app'
      }

      let controlParams = {
        '$ios_deepview': 'egg_peg_deepview_ckbe',
      }
      controlParams = {};

      buo.generateShortUrl(linkProperties, controlParams).then((payload) => {
        this.props.dispatch({type: 'shareLink:set', shareLink: payload.url})
      })
    }).catch((err) => {
      console.warn("Couldn't generate deep link", err);
    })
  }

  render() { return this.props.children }
}

export default connect()(DeeplinkProvider)
